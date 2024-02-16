import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Hotel from "@/models/hotelModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const hotels = await Hotel.find({});
    return NextResponse.json({ data: hotels});
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const hotel = new Hotel(reqBody);
    await hotel.save();
    return NextResponse.json({ data:hotel });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
