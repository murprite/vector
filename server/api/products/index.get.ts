import prisma from "~/lib/prisma";

async function GET() {
    const products = await prisma.product.findMany();
    return products;
}

export default defineEventHandler(async () => GET())