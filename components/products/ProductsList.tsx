import { formatCurrency } from '@/utils/format';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@prisma/client';
import Image from 'next/image';
import FavoriteToggleButton from './FavoriteToggleButton';

const ProductsList = ({products}: {products: Product[]}) => {
    return (
        <div className="mt-12 gap-y-8 grid">
            {products.map((product)=> {
                const {name,image,price,company} = product
                const productId = product.id
                const dollarsAmount = formatCurrency(price)
                return (
                    <article key={productId} className="group relative">
                    <Link href={`/products/${productId}`}>
                    <Card className="flex flex-col md:flex-row  gap-x-6 transform group-hover:shadow-xl transition-shadow duration-200">
                        <CardContent className="flex-1 flex gap-x-6">
                            <div className="relative w-full md:w-48 h-64 md:h-48 rounded overflow-hidden ">
                                <Image src={image} alt={name} fill sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw" priority className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"/>
                            </div>
                            <div>
                                 <h2 className='text-xl font-semibold capitalize'>
                                    {name}
                                 </h2>
                                 <h4 className='text-muted-foreground'>{company}</h4>
                                 <p className='text-muted-foreground text-lg md:ml-auto'>
                                    {dollarsAmount}
                                 </p>
                            </div>
                        </CardContent>
                    </Card>
                    </Link>
                    <div className="absolute z-5 top-4 right-4">
                        <FavoriteToggleButton productId={productId} />
                    </div>
                    </article>
                )
            })}
        </div>
    )
}
export default ProductsList