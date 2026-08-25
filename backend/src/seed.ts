import neo4j, { Driver } from 'neo4j-driver';
import { loadEnv, requireEnv } from './shared/env';

type Row = Record<string, unknown>;

const recalls = [
  {
    id: 'recall-001',
    title: 'PowerCell Battery Safety Recall',
    severity: 'critical',
    status: 'active',
    reason: 'Potential overheating caused by a defective temperature sensor',
    issuedAt: '2026-08-01T09:00:00Z',
  },
  {
    id: 'recall-002',
    title: 'FlexCharge Connector Recall',
    severity: 'high',
    status: 'active',
    reason: 'Connector housing can loosen after repeated use',
    issuedAt: '2026-07-18T10:30:00Z',
  },
  {
    id: 'recall-003',
    title: 'DisplaySeal Adhesive Quality Notice',
    severity: 'medium',
    status: 'monitoring',
    reason: 'Adhesive batches may fail under high humidity',
    issuedAt: '2026-06-22T13:15:00Z',
  },
  {
    id: 'recall-004',
    title: 'Watch Haptic Motor Service Campaign',
    severity: 'low',
    status: 'closed',
    reason: 'Haptic motor can become noisy in a small batch',
    issuedAt: '2026-05-11T16:45:00Z',
  },
];

const components = [
  { id: 'comp-ts-881', name: 'Temperature Sensor TS-881', type: 'sensor', description: 'Monitors cell temperature inside battery modules' },
  { id: 'comp-bc-220', name: 'Battery Cell BC-220', type: 'cell', description: 'Lithium battery cell used across mobile devices' },
  { id: 'comp-bm-100', name: 'Battery Module BM-100', type: 'module', description: 'Battery module for phones and tablets' },
  { id: 'comp-ba-900', name: 'Battery Assembly BA-900', type: 'assembly', description: 'High capacity laptop battery assembly' },
  { id: 'comp-pm-77', name: 'Power Management Board PM-77', type: 'board', description: 'Regulates charging and thermal cutoff' },
  { id: 'comp-fc-12', name: 'FlexCharge Port FC-12', type: 'connector', description: 'USB-C charging connector and port housing' },
  { id: 'comp-ca-50', name: 'Charging Assembly CA-50', type: 'assembly', description: 'Charging module used by phone and tablet lines' },
  { id: 'comp-ds-40', name: 'DisplaySeal Adhesive DS-40', type: 'adhesive', description: 'Display sealing adhesive strip' },
  { id: 'comp-do-11', name: 'Display OLED Panel DO-11', type: 'display', description: 'OLED display panel' },
  { id: 'comp-da-70', name: 'Display Assembly DA-70', type: 'assembly', description: 'Complete display assembly' },
  { id: 'comp-hm-9', name: 'Haptic Motor HM-9', type: 'motor', description: 'Compact vibration motor' },
  { id: 'comp-wc-3', name: 'Watch Core WC-3', type: 'module', description: 'Core electronics package for wearable products' },
  { id: 'comp-ls-6', name: 'Logic Stack LS-6', type: 'assembly', description: 'Main compute and sensor stack' },
];

const products = [
  { id: 'prod-voltbook-pro-15', name: 'VoltBook Pro 15', category: 'laptop', sku: 'VB-PRO-15' },
  { id: 'prod-voltbook-air-13', name: 'VoltBook Air 13', category: 'laptop', sku: 'VB-AIR-13' },
  { id: 'prod-voltphone-x', name: 'VoltPhone X', category: 'phone', sku: 'VP-X' },
  { id: 'prod-voltphone-mini', name: 'VoltPhone Mini', category: 'phone', sku: 'VP-MINI' },
  { id: 'prod-volttab-11', name: 'VoltTab 11', category: 'tablet', sku: 'VT-11' },
  { id: 'prod-voltwatch-3', name: 'VoltWatch 3', category: 'watch', sku: 'VW-3' },
];

const suppliers = [
  { id: 'sup-thermax', name: 'ThermaX Components', country: 'USA' },
  { id: 'sup-nova-cell', name: 'NovaCell Energy', country: 'South Korea' },
  { id: 'sup-flexion', name: 'Flexion Ports Ltd', country: 'Taiwan' },
  { id: 'sup-lumina', name: 'Lumina Display Works', country: 'Japan' },
  { id: 'sup-microdrive', name: 'MicroDrive Systems', country: 'Germany' },
];

const retailers = [
  { id: 'ret-tech-hub', name: 'TechHub Online', city: 'Seattle', country: 'USA' },
  { id: 'ret-gadget-loop', name: 'Gadget Loop', city: 'Austin', country: 'USA' },
  { id: 'ret-byte-market', name: 'Byte Market', city: 'Chicago', country: 'USA' },
  { id: 'ret-metro-electronics', name: 'Metro Electronics', city: 'New York', country: 'USA' },
  { id: 'ret-northstar', name: 'Northstar Devices', city: 'Toronto', country: 'Canada' },
  { id: 'ret-eurovolt', name: 'EuroVolt Retail', city: 'Berlin', country: 'Germany' },
];

const customers = [
  ['cust-001', 'Maya Chen', 'Seattle', 'USA', 'prod-voltbook-pro-15'],
  ['cust-002', 'Owen Grant', 'Austin', 'USA', 'prod-voltphone-x'],
  ['cust-003', 'Priya Shah', 'Chicago', 'USA', 'prod-volttab-11'],
  ['cust-004', 'Liam Brooks', 'New York', 'USA', 'prod-voltbook-air-13'],
  ['cust-005', 'Nora Diaz', 'Toronto', 'Canada', 'prod-voltwatch-3'],
  ['cust-006', 'Ethan Walker', 'Berlin', 'Germany', 'prod-voltphone-mini'],
  ['cust-007', 'Ava Morgan', 'Denver', 'USA', 'prod-voltbook-pro-15'],
  ['cust-008', 'Noah Reed', 'Boston', 'USA', 'prod-voltphone-x'],
  ['cust-009', 'Isla Patel', 'San Jose', 'USA', 'prod-volttab-11'],
  ['cust-010', 'Leo Kim', 'Portland', 'USA', 'prod-voltbook-air-13'],
  ['cust-011', 'Zoe Miller', 'Dallas', 'USA', 'prod-voltphone-mini'],
  ['cust-012', 'Lucas Wright', 'Miami', 'USA', 'prod-voltwatch-3'],
  ['cust-013', 'Amara Okafor', 'Atlanta', 'USA', 'prod-voltbook-pro-15'],
  ['cust-014', 'Mateo Rivera', 'Phoenix', 'USA', 'prod-voltphone-x'],
  ['cust-015', 'Grace Lee', 'San Diego', 'USA', 'prod-volttab-11'],
  ['cust-016', 'Henry Scott', 'Detroit', 'USA', 'prod-voltbook-air-13'],
  ['cust-017', 'Ella Hughes', 'Calgary', 'Canada', 'prod-voltphone-mini'],
  ['cust-018', 'Mila Novak', 'Prague', 'Czechia', 'prod-voltwatch-3'],
  ['cust-019', 'Kai Johnson', 'Las Vegas', 'USA', 'prod-voltbook-pro-15'],
  ['cust-020', 'Sophia Bennett', 'Orlando', 'USA', 'prod-voltphone-x'],
  ['cust-021', 'Daniel Young', 'Raleigh', 'USA', 'prod-volttab-11'],
  ['cust-022', 'Mina Park', 'Vancouver', 'Canada', 'prod-voltbook-air-13'],
  ['cust-023', 'Jonas Weber', 'Munich', 'Germany', 'prod-voltwatch-3'],
  ['cust-024', 'Ivy Robinson', 'Nashville', 'USA', 'prod-voltphone-mini'],
].map(([id, name, city, country, productId]) => ({ id, name, city, country, productId }));

const recallAffects = [
  ['recall-001', 'comp-ts-881'],
  ['recall-002', 'comp-fc-12'],
  ['recall-003', 'comp-ds-40'],
  ['recall-004', 'comp-hm-9'],
].map(([recallId, componentId]) => ({ recallId, componentId }));

const supplies = [
  ['sup-thermax', 'comp-ts-881'],
  ['sup-nova-cell', 'comp-bc-220'],
  ['sup-nova-cell', 'comp-bm-100'],
  ['sup-flexion', 'comp-fc-12'],
  ['sup-flexion', 'comp-ca-50'],
  ['sup-lumina', 'comp-ds-40'],
  ['sup-lumina', 'comp-do-11'],
  ['sup-microdrive', 'comp-hm-9'],
  ['sup-microdrive', 'comp-wc-3'],
].map(([supplierId, componentId]) => ({ supplierId, componentId }));

const partOf = [
  ['comp-ts-881', 'comp-bm-100'],
  ['comp-bc-220', 'comp-bm-100'],
  ['comp-bm-100', 'comp-ba-900'],
  ['comp-pm-77', 'comp-ba-900'],
  ['comp-fc-12', 'comp-ca-50'],
  ['comp-ca-50', 'comp-ls-6'],
  ['comp-ds-40', 'comp-da-70'],
  ['comp-do-11', 'comp-da-70'],
  ['comp-hm-9', 'comp-wc-3'],
  ['comp-wc-3', 'comp-ls-6'],
  ['comp-ls-6', 'comp-ba-900'],
].map(([childId, parentId]) => ({ childId, parentId }));

const usedIn = [
  ['comp-ba-900', 'prod-voltbook-pro-15'],
  ['comp-bm-100', 'prod-voltbook-air-13'],
  ['comp-bm-100', 'prod-voltphone-x'],
  ['comp-ca-50', 'prod-voltphone-x'],
  ['comp-ca-50', 'prod-voltphone-mini'],
  ['comp-ca-50', 'prod-volttab-11'],
  ['comp-da-70', 'prod-voltphone-x'],
  ['comp-da-70', 'prod-volttab-11'],
  ['comp-wc-3', 'prod-voltwatch-3'],
  ['comp-ls-6', 'prod-voltphone-mini'],
].map(([componentId, productId]) => ({ componentId, productId }));

const soldBy = [
  ['prod-voltbook-pro-15', 'ret-tech-hub'],
  ['prod-voltbook-pro-15', 'ret-byte-market'],
  ['prod-voltbook-air-13', 'ret-tech-hub'],
  ['prod-voltbook-air-13', 'ret-northstar'],
  ['prod-voltphone-x', 'ret-gadget-loop'],
  ['prod-voltphone-x', 'ret-metro-electronics'],
  ['prod-voltphone-mini', 'ret-gadget-loop'],
  ['prod-volttab-11', 'ret-byte-market'],
  ['prod-volttab-11', 'ret-eurovolt'],
  ['prod-voltwatch-3', 'ret-metro-electronics'],
  ['prod-voltwatch-3', 'ret-eurovolt'],
].map(([productId, retailerId]) => ({ productId, retailerId }));

async function runWrite(driver: Driver, cypher: string, params: Record<string, unknown> = {}) {
  const session = driver.session({ defaultAccessMode: 'WRITE' });

  try {
    await session.run(cypher, params);
  } finally {
    await session.close();
  }
}

async function tryConstraint(driver: Driver, label: string) {
  try {
    await runWrite(
      driver,
      `CREATE CONSTRAINT ${label.toLowerCase()}_id_unique IF NOT EXISTS FOR (n:${label}) REQUIRE n.id IS UNIQUE`,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Skipping ${label} id constraint: ${message}`);
  }
}

async function upsertNodes(driver: Driver, label: string, rows: Row[]) {
  await runWrite(
    driver,
    `
    UNWIND $rows AS row
    MERGE (node:${label} {id: row.id})
    SET node += row
    `,
    { rows },
  );
}

async function main() {
  loadEnv();

  const driver = neo4j.driver(
    requireEnv('NEO4J_URI'),
    neo4j.auth.basic(requireEnv('NEO4J_USERNAME'), requireEnv('NEO4J_PASSWORD')),
  );

  await driver.verifyConnectivity();

  for (const label of ['Recall', 'Component', 'Product', 'Supplier', 'Retailer', 'Customer']) {
    await tryConstraint(driver, label);
  }

  await upsertNodes(driver, 'Recall', recalls);
  await upsertNodes(driver, 'Component', components);
  await upsertNodes(driver, 'Product', products);
  await upsertNodes(driver, 'Supplier', suppliers);
  await upsertNodes(driver, 'Retailer', retailers);
  await upsertNodes(driver, 'Customer', customers.map(({ productId, ...customer }) => customer));

  await runWrite(
    driver,
    `
    UNWIND $rows AS row
    MATCH (recall:Recall {id: row.recallId})
    MATCH (component:Component {id: row.componentId})
    MERGE (recall)-[:AFFECTS]->(component)
    `,
    { rows: recallAffects },
  );

  await runWrite(
    driver,
    `
    UNWIND $rows AS row
    MATCH (supplier:Supplier {id: row.supplierId})
    MATCH (component:Component {id: row.componentId})
    MERGE (supplier)-[:SUPPLIES]->(component)
    `,
    { rows: supplies },
  );

  await runWrite(
    driver,
    `
    UNWIND $rows AS row
    MATCH (child:Component {id: row.childId})
    MATCH (parent:Component {id: row.parentId})
    MERGE (child)-[:PART_OF]->(parent)
    `,
    { rows: partOf },
  );

  await runWrite(
    driver,
    `
    UNWIND $rows AS row
    MATCH (component:Component {id: row.componentId})
    MATCH (product:Product {id: row.productId})
    MERGE (component)-[:USED_IN]->(product)
    `,
    { rows: usedIn },
  );

  await runWrite(
    driver,
    `
    UNWIND $rows AS row
    MATCH (product:Product {id: row.productId})
    MATCH (retailer:Retailer {id: row.retailerId})
    MERGE (product)-[:SOLD_BY]->(retailer)
    `,
    { rows: soldBy },
  );

  await runWrite(
    driver,
    `
    UNWIND $rows AS row
    MATCH (customer:Customer {id: row.id})
    MATCH (product:Product {id: row.productId})
    MERGE (customer)-[:PURCHASED]->(product)
    `,
    { rows: customers },
  );

  await driver.close();
  console.log('Seed complete.');
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
