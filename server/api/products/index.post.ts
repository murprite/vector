import prisma from "~/lib/prisma";
import { IProductQuery } from "~/assets/constants/constants";

// async function POST(body: any) {
//    const data = await readBody<IProductQuery>(body);
//    const product = await prisma.product.create( { data: JSON.parse(data) } );
//    return product;
// }

// export default defineEventHandler(async (event) => POST(event));