import { Injectable, NotFoundException } from '@nestjs/common';
import type { Node, Path } from 'neo4j-driver';
import { Neo4jService } from '../neo4j/neo4j.service';
import { mapNode, mapPath, toNative } from './graph.types';

@Injectable()
export class GraphService {
  constructor(private readonly neo4j: Neo4jService) {}

  async health() {
    const result = await this.neo4j.read('RETURN 1 AS ok');
    return { ok: result.records[0]?.get('ok').toNumber() === 1 };
  }

  async recalls() {
    const result = await this.neo4j.read<{ recall: Node }>(`
      MATCH (recall:Recall)
      RETURN recall
      ORDER BY recall.issuedAt DESC
    `);

    return result.records.map((record) => mapNode(record.get('recall')));
  }

  async affectedProducts(recallId: string) {
    const result = await this.neo4j.read<{ product: Node; paths: Path[] }>(
      `
      MATCH (recall:Recall {id: $recallId})-[:AFFECTS]->(component:Component)
      MATCH path = (component)-[:PART_OF*0..]->(:Component)-[:USED_IN]->(product:Product)
      RETURN product, collect(path) AS paths
      ORDER BY product.name
      `,
      { recallId },
    );

    return result.records.map((record) => ({
      product: mapNode(record.get('product')),
      paths: record.get('paths').map(mapPath),
    }));
  }

  async affectedCustomers(recallId: string) {
    const result = await this.neo4j.read<{ customer: Node; product: Node; path: Path }>(
      `
      MATCH (recall:Recall {id: $recallId})-[:AFFECTS]->(component:Component)
      MATCH path = (customer:Customer)-[:PURCHASED]->(product:Product)<-[:USED_IN]-(:Component)<-[:PART_OF*0..]-(component)
      RETURN customer, product, path
      ORDER BY customer.name, product.name
      `,
      { recallId },
    );

    return result.records.map((record) => ({
      customer: mapNode(record.get('customer')),
      product: mapNode(record.get('product')),
      path: mapPath(record.get('path')),
    }));
  }

  async suppliersForRecall(recallId: string) {
    const result = await this.neo4j.read<{
      supplier: Node;
      component: Node;
      supplyPath: Path;
      componentPath: Path;
    }>(
      `
      MATCH (recall:Recall {id: $recallId})-[:AFFECTS]->(recalled:Component)
      MATCH supplyPath = (supplier:Supplier)-[:SUPPLIES]->(component:Component)
      MATCH componentPath = (recalled)-[:PART_OF*0..]->(component)
      RETURN DISTINCT supplier, component, supplyPath, componentPath
      ORDER BY supplier.name, component.name
      `,
      { recallId },
    );

    return result.records.map((record) => ({
      supplier: mapNode(record.get('supplier')),
      component: mapNode(record.get('component')),
      supplyPath: mapPath(record.get('supplyPath')),
      componentPath: mapPath(record.get('componentPath')),
    }));
  }

  async explainProductImpact(recallId: string, productId: string) {
    const result = await this.neo4j.read<{ path: Path }>(
      `
      MATCH (recall:Recall {id: $recallId})-[:AFFECTS]->(component:Component)
      MATCH path = (recall)-[:AFFECTS]->(component)-[:PART_OF*0..]->(:Component)-[:USED_IN]->(product:Product {id: $productId})
      RETURN path
      ORDER BY length(path)
      LIMIT 5
      `,
      { recallId, productId },
    );

    if (result.records.length === 0) {
      throw new NotFoundException('No impact path found for that recall and product.');
    }

    return result.records.map((record) => mapPath(record.get('path')));
  }

  async graphSummary() {
    const result = await this.neo4j.read<{ label: string; count: number }>(`
      MATCH (node)
      UNWIND labels(node) AS label
      RETURN label, count(node) AS count
      ORDER BY label
    `);

    return result.records.map((record) => ({
      label: record.get('label'),
      count: toNative(record.get('count')),
    }));
  }
}
