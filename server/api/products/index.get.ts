import prisma from "~/lib/prisma";

interface Query {
    name?:     string;
    imageUrl?: string;
    price?: number;

    //  Types:
    //  Dried: 0;
    //  Fresh: 1;
    //  Live: 2;
    //  Vases: 3;
    //  Candles: 4;
    //  Refreshers: 5
    flowersType?: number;
}
  

async function GET(event: any) {
    let query = getQuery<Query>(event);
    
    // i'm only a human after all don't put your blame on me
    if(query.flowersType) query.flowersType = Number(query.flowersType);
    if(query.price) query.price = Number(query.price);

    const products = Object.keys(query).length !== 0 ? await prisma.product.findMany({ where: query }) : await prisma.product.findMany();
    return products;
}


export default defineEventHandler(async (event) => GET(event));