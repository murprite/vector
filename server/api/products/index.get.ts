import prisma from "~/lib/prisma";

interface Query {
    id?: number;
    name?:     string;
    cardImageUrl?: string;
    price?: Number;
    images?: String;

    //  Types:
    //  Dried: 0;
    //  Fresh: 1;
    //  Live: 2;
    //  Vases: 3;
    //  Candles: 4;
    //  Refreshers: 5
    flowersType?: Number;
}
  

async function GET(event: any) {
    let query = getQuery<Query>(event);

    // don't put your blame on me
    if(query.flowersType) query.flowersType = Number(query.flowersType);
    if(query.price) query.price = Number(query.price);
    if(query.id) query.id = Number(query.id);

    const products = Object.keys(query).length !== 0 ? await prisma.product.findMany({ where: query }) : await prisma.product.findMany();
    return products;
}


export default defineEventHandler(async (event) => GET(event));