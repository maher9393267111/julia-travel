import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Tour from "@/models/tourModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const tours = await Tour.find({});
    return NextResponse.json({ data: tours });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const tour= new Tour(reqBody);
    await tour.save();
    return NextResponse.json({ data: tour });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
