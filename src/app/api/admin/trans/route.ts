import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Trans from "@/models/transictionModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const flights = await Trans.find({});
    return NextResponse.json({ data: flights });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const trans = new Trans(reqBody);
    await trans.save();
    return NextResponse.json({ data: trans });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
