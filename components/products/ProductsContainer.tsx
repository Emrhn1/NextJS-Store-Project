import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { fetchAllProducts } from '@/utils/actions';
import Link from 'next/link';

async function ProductsContainer({search,layout}: {search: string, layout: string})  {
    const products = await fetchAllProducts({search});
    const totalProducts = products.length;
    const searchTerm = search ? `&search=${search}` : '';
    return (
        <>
        <section>
            <div className="flex justify-between items-center">
                 <h4 className="font-medium text-lg">
                     {totalProducts > 0 ? (
                        <p>{totalProducts} Products</p>
                     ):
                     <h2 className="font-medium text-lg">No products found...</h2>
                     }
                 </h4>
                <div className="flex gap-x-4">
                  <Button asChild variant={layout === 'grid' ? 'default' : 'ghost'} size="icon">
                      <Link href={`/products?layout=grid${searchTerm}`}>
                          <LuLayoutGrid/>
                      </Link>
                  </Button>
                    <Button asChild variant={layout === "list" ? "default" : "ghost"} size="icon">
                        <Link href={`/products?layout=list${searchTerm}`}>
                            <LuList/>
                        </Link>
                    </Button>
                </div>
            </div>
            <Separator className="mt-5"/>
        </section>
            <div>
                {totalProducts === 0 ? (
                    <h5>No products matched your search</h5>
                ): layout === 'grid' ? (
                    <ProductsGrid products={products}/>
                ): (
                    <ProductsList products={products}/>
                )
                }
            </div>
        </>
    )
}
export default ProductsContainer