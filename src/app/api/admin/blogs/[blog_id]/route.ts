import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Blog from "@/models/blogModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      blog_id: string;
    };
  }
) {
  try {
    // await validateApiRequest(req);
    const category = await Blog.findById(params.blog_id);
    return NextResponse.json({ data: category });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { blog_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Blog.updateOne({ _id: params.blog_id }, reqBody);
    return NextResponse.json({ message: "blog updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { blog_id: string } }
) {
  try {
    await validateApiRequest(req);
    await Blog.deleteOne({ _id: params.blog_id });
    return NextResponse.json({ message: "category deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
