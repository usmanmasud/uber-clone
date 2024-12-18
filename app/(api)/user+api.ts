import { data } from "@/constants";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(request: Request) {
  try {
    const posts = await sql("SELECT * FROM posts");
    const { name, email, clerkId } = await request.json();

    // if (!name || !email || !clerkId) {
    //     return Response.json(
    //         data: {error: "Missing fileds"},
    //             init: {status: 400}
    //     )
    // }

    const response = await sql`
            INSERT INTO users (
                name,
                email,
                clerkId
                )
                VALUES (
                    ${name}
                    ${email}
                    ${clerkId}
                )
        `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}

// See https://neon.tech/docs/serverless/serverless-driver
// for more information
