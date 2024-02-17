import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Car from "@/models/carModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const cars = await Car.find({});
    return NextResponse.json({ data: cars });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const car = new Car(reqBody);
    await car.save();
    return NextResponse.json({ data: car });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
