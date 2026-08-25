import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import type { Driver, QueryResult, RecordShape } from 'neo4j-driver';
import { NEO4J_DRIVER } from './neo4j.constants';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  constructor(@Inject(NEO4J_DRIVER) private readonly driver: Driver) {}

  async read<T extends RecordShape = RecordShape>(
    cypher: string,
    params: Record<string, unknown> = {},
  ): Promise<QueryResult<T>> {
    const session = this.driver.session({ defaultAccessMode: 'READ' });

    try {
      return await session.run<T>(cypher, params);
    } finally {
      await session.close();
    }
  }

  async write<T extends RecordShape = RecordShape>(
    cypher: string,
    params: Record<string, unknown> = {},
  ): Promise<QueryResult<T>> {
    const session = this.driver.session({ defaultAccessMode: 'WRITE' });

    try {
      return await session.run<T>(cypher, params);
    } finally {
      await session.close();
    }
  }

  async onApplicationShutdown() {
    await this.driver.close();
  }
}
