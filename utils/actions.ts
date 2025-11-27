import prisma from "@/utils/db";


export const fetchFeaturedProducts = async () => {
    const fetchData = prisma.product.findMany({
        where: {
            featured: true
        }
    })
    return fetchData
}

export const fetchAllProducts = () => {
    return prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}