import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Hotel from "@/models/hotelModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      hotel_id: string;
    };
  }
) {
  try {
    await validateApiRequest(req);
    const hotel = await Hotel.findById(params.hotel_id);
    return NextResponse.json({ data:hotel });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { hotel_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Hotel.updateOne({ _id: params.hotel_id }, reqBody);
    return NextResponse.json({ message: "hotel updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { hotel_id: string } }
) {
  try {
    await validateApiRequest(req);
    await Hotel.deleteOne({ _id: params.hotel_id });
    return NextResponse.json({ message: "hotel deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
