import prisma from "@/utils/db";


export const fetchFeaturedProducts = async () => {
    const fetchData = prisma.product.findMany({
        where: {
            featured: true
        }
    })
    return fetchData
}

export const fetchAllProducts = ({search=''}:{search: string}) => {
    return prisma.product.findMany({
         where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
        orderBy: {
            createdAt: 'desc'
        }
    })
}