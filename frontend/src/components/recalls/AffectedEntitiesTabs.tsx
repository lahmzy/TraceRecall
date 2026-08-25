'use client';

import { useState } from 'react';
import { Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { nodeTitle } from '@/lib/graph';
import type { AffectedCustomer } from '@/types/customer';
import type { GraphPath } from '@/types/graph';
import type { AffectedProduct } from '@/types/product';
import type { ConnectedSupplier } from '@/types/supplier';
import { WhyAffectedSheet } from './WhyAffectedSheet';

export function AffectedEntitiesTabs({
  products,
  customers,
  suppliers,
}: {
  products: AffectedProduct[];
  customers: AffectedCustomer[];
  suppliers: ConnectedSupplier[];
}) {
  const [selected, setSelected] = useState<{ title: string; path?: GraphPath } | null>(null);

  return (
    <>
      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-3 sm:inline-flex sm:w-auto">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">SKU</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((item) => (
                    <TableRow key={item.product.properties.id}>
                      <TableCell className="font-medium">
                        <div>{item.product.properties.name}</div>
                        <div className="mt-0.5 text-[11px] font-normal text-muted-foreground sm:hidden">
                          {item.product.properties.category} • SKU: {item.product.properties.sku}
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">{item.product.properties.category}</TableCell>
                      <TableCell className="hidden text-muted-foreground md:table-cell">{item.product.properties.sku}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="whitespace-nowrap px-2 sm:px-3" onClick={() => setSelected({ title: item.product.properties.name, path: item.paths[0] })}>
                          <Route className="h-4 w-4" /> <span className="hidden sm:inline">View path</span><span className="sm:hidden">Path</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Location</TableHead>
                    <TableHead>Purchased</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((item) => (
                    <TableRow key={`${item.customer.properties.id}-${item.product.properties.id}`}>
                      <TableCell className="font-medium">
                        <div>{item.customer.properties.name}</div>
                        <div className="mt-0.5 text-[11px] font-normal text-muted-foreground sm:hidden">
                          {item.customer.properties.city}, {item.customer.properties.country}
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">
                        {item.customer.properties.city}, {item.customer.properties.country}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.product.properties.name}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="whitespace-nowrap px-2 sm:px-3" onClick={() => setSelected({ title: item.customer.properties.name, path: item.path })}>
                          <Route className="h-4 w-4" /> <span className="hidden sm:inline">Why affected?</span><span className="sm:hidden">Why?</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="suppliers">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="hidden sm:table-cell">Country</TableHead>
                    <TableHead>Connected component</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((item) => (
                    <TableRow key={`${item.supplier.properties.id}-${item.component.properties.id}`}>
                      <TableCell className="font-medium">
                        <div>{item.supplier.properties.name}</div>
                        <div className="mt-0.5 text-[11px] font-normal text-muted-foreground sm:hidden">
                          {item.supplier.properties.country}
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">{item.supplier.properties.country}</TableCell>
                      <TableCell className="text-muted-foreground">{item.component.properties.name}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="whitespace-nowrap px-2 sm:px-3"
                          onClick={() =>
                            setSelected({
                              title: `${nodeTitle(item.supplier)} to ${nodeTitle(item.component)}`,
                              path: item.componentPath,
                            })
                          }
                        >
                          <Route className="h-4 w-4" /> <span className="hidden sm:inline">View path</span><span className="sm:hidden">Path</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <WhyAffectedSheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} title={selected?.title ?? ''} path={selected?.path} />
    </>
  );
}
