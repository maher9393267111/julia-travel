import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Flight from "@/models/flightModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const flights = await Flight.find({});
    return NextResponse.json({ data: flights });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const flight = new Flight(reqBody);
    await flight.save();
    return NextResponse.json({ data: flight });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
