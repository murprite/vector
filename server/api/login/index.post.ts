import prisma from "~/lib/prisma";

const MAIN_KEY = "myownserverkey";

export default defineEventHandler(async (event) => {
  let body: any = await readBody(event);

  if(!body) {
    return {error: "There's no such user"};
  }
  const user = await prisma.user.findMany({ where: {
    fullName: body.username,
    pass: body.pass,
  }})
  
  const jwt = `${body.username}.${body.pass}.${MAIN_KEY}`;

  if(user.length !== 0) {
    // TODO: make normal security
    return jwt;
  } else {
    return {error: "There's no such user"};
  }
});
