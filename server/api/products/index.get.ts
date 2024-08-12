import prisma from "~/lib/prisma";

async function GET(event: any) {
    console.log(event.node.req.url)
    const products = await prisma.product.findMany();
    return products;
}

export default defineEventHandler(async (event) => GET(event))