import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Package from "@/models/packageModel";
import { NextResponse, NextRequest } from "next/server";
import { FilterQuery } from "mongoose";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);

   //  const response = await axios.get("/api/admin/packages?location=bursa");
    const url = new URL(req.url);
    const location = url.searchParams.get("location");

    const limit = url.searchParams.get("limit");
  
    // workaround typescript, da await Post.find(username && { username }) mit einer Warnung daherkommt
    let filter: FilterQuery<any> = {};
    if (location) {
      filter.location = location;
    }




    const packages = limit ?   await Package.find(filter).sort({ createdAt: -1 }).limit(3) :  await Package.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ data: packages });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const category = new Package(reqBody);
    await category.save();
    return NextResponse.json({ data: category });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
