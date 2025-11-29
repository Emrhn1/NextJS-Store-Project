import BreadCrumbs from '@/components/single-product/Breadcrumb';
import { fetchSingleProduct } from '@/utils/actions';
import Image from 'next/image';
import { formatCurrency } from '@/utils/format';
import FavoriteToggleButton from '@/components/products/FavoriteToggleButton';
import AddToCart from '@/components/single-product/AddToCart';
import ProductRating from '@/components/single-product/ProductRating';

async function SingleProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await fetchSingleProduct(id);
    const { name, price, description, image, company } = product;
    const dollarsAmount = formatCurrency(price);

    return (
      <section>
          <BreadCrumbs name={name}/>
          <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
              {/* IMAGE FIRST COL */}
              <div className='relative h-full min-h-[300px]'>
                  <Image src={image} alt={name} fill priority sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw' className="object-cover w-full rounded-md"/>
              </div>
              {/* PRODUCT INFO SECOND COL */}
              <div>
                  <div className="flex gap-x-8 items-center">
                      <h2 className="capitalize text-3xl font-bold">{name}</h2>
                      <FavoriteToggleButton productId={id}/>
                  </div>
                  <ProductRating productId={id}/>
                  <h4 className="text-xl mt-2">{company}</h4>
                  <p className="mt-3 text-md bg-muted inline-block p-2 rounded">{dollarsAmount}</p>
                  <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
                  <AddToCart productId={id}/>
              </div>
          </div>
      </section>
    )
}
export default SingleProductPage;