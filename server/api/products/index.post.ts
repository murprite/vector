import prisma from "~/lib/prisma";

async function POST(body: any) {
    const data = await readBody(body);
    const product = await prisma.product.create( { data: JSON.parse(data) } );
    return product;
}

export default defineEventHandler(async (event) => POST(event));