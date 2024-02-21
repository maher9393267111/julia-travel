import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Visa from "@/models/visaModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const categories = await Visa.find({});
    return NextResponse.json({ data: categories });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const visa = new Visa(reqBody);
    await visa.save();
    return NextResponse.json({ data: visa});
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
