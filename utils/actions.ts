"use server"

import prisma from "@/utils/db";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs/server";
import {RenderError} from "next/dist/next-devtools/dev-overlay/container/runtime-error/render-error";
import { revalidatePath } from 'next/cache';

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

export const fetchCartItems = async () => {
  const user = await currentUser();
  if (!user) return null;

  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: user.id,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
        orderBy: {
            createdAt: 'asc'
        }
      },
    },
  });
  return cart;
};

export const addToCart = async (productId: string) => {
  const user = await currentUser();
  if (!user) {
    return { message: 'Please login to add to cart' };
  }

  try {
      let cart = await prisma.cart.findFirst({
        where: {
          clerkId: user.id,
        },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            clerkId: user.id,
          },
        });
      }

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return { message: 'Product not found' };
      }

      const cartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: productId,
        },
      });

      if (cartItem) {
        await prisma.cartItem.update({
          where: { id: cartItem.id },
          data: { amount: cartItem.amount + 1 },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: productId,
            amount: 1,
          },
        });
      }

      await updateCartTotals(cart.id);
      revalidatePath('/cart');
      return { message: 'Added to cart' };
  } catch (error) {
      return renderError(error);
  }
};

export const removeCartItem = async (cartItemId: string) => {
    const user = await currentUser();
    if (!user) return { message: 'Please login' };

    try {
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { cart: true }
        });

        if (!cartItem) return { message: 'Item not found' };

        if (cartItem.cart.clerkId !== user.id) {
             return { message: 'Not authorized' };
        }

        await prisma.cartItem.delete({
            where: { id: cartItemId }
        });

        await updateCartTotals(cartItem.cartId);
        revalidatePath('/cart');
        return { message: 'Item removed' };
    } catch (error) {
        return renderError(error);
    }
};

export const updateCartItemAmount = async (cartItemId: string, amount: number) => {
    const user = await currentUser();
    if (!user) return { message: 'Please login' };

    try {
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
             include: { cart: true }
        });

        if (!cartItem) return { message: 'Item not found' };

         if (cartItem.cart.clerkId !== user.id) {
             return { message: 'Not authorized' };
        }

        if (amount <= 0) {
             await prisma.cartItem.delete({
                where: { id: cartItemId }
            });
        } else {
            await prisma.cartItem.update({
                where: { id: cartItemId },
                data: { amount },
            });
        }

        await updateCartTotals(cartItem.cartId);
        revalidatePath('/cart');
        return { message: 'Cart updated' };
    } catch (error) {
        return renderError(error);
    }
};

const updateCartTotals = async (cartId: string) => {
    const cartItems = await prisma.cartItem.findMany({
        where: { cartId },
        include: { product: true }
    });

    let numItemsInCart = 0;
    let cartTotal = 0;

    for (const item of cartItems) {
        numItemsInCart += item.amount;
        cartTotal += item.amount * item.product.price;
    }

    const tax = Math.round(cartTotal * 0.1);
    const shipping = 5;
    const orderTotal = cartTotal + tax + shipping;

    await prisma.cart.update({
        where: { id: cartId },
        data: {
            numItemsInCart,
            cartTotal,
            tax,
            shipping,
            orderTotal
        }
    });
};
