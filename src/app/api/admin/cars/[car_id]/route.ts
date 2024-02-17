import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Car from "@/models/carModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      car_id: string;
    };
  }
) {
  try {
    await validateApiRequest(req);
    const car= await Car.findById(params.car_id);
    return NextResponse.json({ data: car });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { car_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Car.updateOne({ _id: params.car_id }, reqBody);
    return NextResponse.json({ message: "car updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { car_id: string } }
) {
  try {
    await validateApiRequest(req);
    await Car.deleteOne({ _id: params.car_id });
    return NextResponse.json({ message: "car deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
