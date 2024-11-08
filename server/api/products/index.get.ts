import prisma from "~/lib/prisma";
import { IProductQuery } from "~/assets/constants/constants";

async function GET(event: any) {
    let query: any = getQuery<IProductQuery>(event);
    let keys = Object.keys(query);

    for(let i = 0; i < Object.keys(query).length; i++) {
        try {
            query[keys[i]] = parseInt(query[keys[i]])
        } catch {
            query[keys[i]] = query[keys[i]]
        }
    }

    const products = Object.keys(query).length !== 0 ? await prisma.product.findMany({ where: query }) : await prisma.product.findMany();
    return products;
}

export default defineEventHandler(async (event) => GET(event));