import { Controller, Get, Param } from '@nestjs/common';
import { GraphService } from './graph.service';

@Controller()
export class GraphController {
  constructor(private readonly graph: GraphService) {}

  @Get()
  root() {
    return {
      status: 'ok',
      service: 'RecallTrace API',
      endpoints: ['/health', '/recalls', '/graph/summary'],
    };
  }

  @Get('health')
  health() {
    return this.graph.health();
  }

  @Get('graph/summary')
  graphSummary() {
    return this.graph.graphSummary();
  }

  @Get('recalls')
  recalls() {
    return this.graph.recalls();
  }

  @Get('recalls/:recallId/products')
  affectedProducts(@Param('recallId') recallId: string) {
    return this.graph.affectedProducts(recallId);
  }

  @Get('recalls/:recallId/customers')
  affectedCustomers(@Param('recallId') recallId: string) {
    return this.graph.affectedCustomers(recallId);
  }

  @Get('recalls/:recallId/suppliers')
  suppliersForRecall(@Param('recallId') recallId: string) {
    return this.graph.suppliersForRecall(recallId);
  }

  @Get('recalls/:recallId/products/:productId/explain')
  explainProductImpact(@Param('recallId') recallId: string, @Param('productId') productId: string) {
    return this.graph.explainProductImpact(recallId, productId);
  }
}
