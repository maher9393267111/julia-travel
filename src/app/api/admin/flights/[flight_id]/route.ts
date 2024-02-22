import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Flight from "@/models/flightModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      flight_id: string;
    };
  }
) {
  try {
    // await validateApiRequest(req);
    const flight = await Flight.findById(params.flight_id);
    return NextResponse.json({ data: flight });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { flight_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Flight.updateOne({ _id: params.flight_id }, reqBody);
    return NextResponse.json({ message: "flight updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { flight_id: string } }
) {
  try {
    await validateApiRequest(req);
    console.log("BACKEND ????" , params.flight_id)
    await Flight.deleteOne({ _id: params.flight_id });
    return NextResponse.json({ message: "flight deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
