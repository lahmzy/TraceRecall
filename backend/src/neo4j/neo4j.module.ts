import { Global, Module } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';
import { requireEnv } from '../shared/env';
import { NEO4J_DRIVER } from './neo4j.constants';
import { Neo4jService } from './neo4j.service';

@Global()
@Module({
  providers: [
    {
      provide: NEO4J_DRIVER,
      useFactory: async (): Promise<Driver> => {
        const driver = neo4j.driver(
          requireEnv('NEO4J_URI'),
          neo4j.auth.basic(requireEnv('NEO4J_USERNAME'), requireEnv('NEO4J_PASSWORD')),
          {
            maxConnectionPoolSize: 10,
            connectionAcquisitionTimeout: 10000,
          },
        );

        try {
          await driver.verifyConnectivity();
        } catch (error) {
          console.warn('Neo4j initial connectivity check warning:', error);
        }
        return driver;
      },
    },
    Neo4jService,
  ],
  exports: [Neo4jService],
})
export class Neo4jModule {}
