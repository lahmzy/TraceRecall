import { Module } from '@nestjs/common';
import { GraphController } from './graph/graph.controller';
import { GraphService } from './graph/graph.service';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  imports: [Neo4jModule],
  controllers: [GraphController],
  providers: [GraphService],
})
export class AppModule {}
