"use server"

import prisma from "@/utils/db";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs/server";
import {RenderError} from "next/dist/next-devtools/dev-overlay/container/runtime-error/render-error";

const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
        message: error instanceof Error ? error.message : 'An error occurred',
    };
};

export const fetchFeaturedProducts = async () => {
    const fetchData = await prisma.product.findMany({
        where: {
            featured: true
        }
    })
    return fetchData
}

export const fetchAllProducts = async ({search=''}:{search: string}) => {
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

export const fetchSingleProduct = async (productId: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) {
        redirect('products')
    }
    return product;
}

export const createProductAction = async (prevState: any, formData: FormData): Promise<{message:string}> => {
    const user = await currentUser()
    if(!user) redirect("/")
    try {
      const name = formData.get("name") as string;
      const company = formData.get("company") as string;
      const price = Number(formData.get("price") as string);
      const image = formData.get("image") as File;
      const featured = Boolean(formData.get("featured") as string);
      const description = formData.get("description") as string;

      await prisma.product.create({
          data: {
              name,
              company,
              price,
              image:"/images/product-01.jpg",
              featured,
              description,
              clerkId: user.id,
          }
      })

      return {message: "Product Created"}
    } catch (error) {
        return renderError(error);
    }
}