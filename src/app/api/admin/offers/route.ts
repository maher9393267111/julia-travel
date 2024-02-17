import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Offer from "@/models/offerModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const flights = await Offer.find({});
    return NextResponse.json({ data: flights });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const offer = new Offer(reqBody);
    await offer.save();
    return NextResponse.json({ data: offer });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
