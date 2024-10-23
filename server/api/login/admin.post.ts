import prisma from "~/lib/prisma"

interface UserBody {
  jwt?: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<UserBody>(event);
  const jwt = body.jwt;

  if(!jwt) {
    return {error: 403, desc: "Unauthorized"}
  } else {


  }
})
