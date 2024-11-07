import prisma from "~/lib/prisma";
import { IProductQuery } from "~/assets/constants/constants";

async function GET(event: any) {
    let query = getQuery<IProductQuery>(event);
    query.flowersType = Number(query.flowersType);
    const products = Object.keys(query).length !== 0 ? await prisma.product.findMany({ where: query }) : await prisma.product.findMany();
    return products;
}

export default defineEventHandler(async (event) => GET(event));