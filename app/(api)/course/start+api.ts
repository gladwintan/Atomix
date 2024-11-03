import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { courseName, clerkId } = await request.json();

    if (!courseName || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      INSERT INTO progress (
        user_id, 
        course_id
      )
      SELECT 
        users.id,
        courses.course_id 
      FROM 
        users,
        courses
      WHERE 
        users.clerk_id = ${clerkId} 
        AND
        courses.course_name = ${courseName}  
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}