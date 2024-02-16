import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Blog from "@/models/blogModel";
import { NextResponse, NextRequest } from "next/server";
import NextCors from 'nextjs-cors'
connectDB();

export async function GET(req: any ,res:any) {

 
  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });



  


  try {
    // await validateApiRequest(req);
    const blogs = await Blog.find({});
    return NextResponse.json({ data: blogs });

    




  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req:any , res:any ) {

  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });





  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const blog = new Blog(reqBody);
    await blog.save();
    return NextResponse.json({ data:blog });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
