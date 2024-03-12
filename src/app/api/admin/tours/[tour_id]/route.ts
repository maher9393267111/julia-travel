import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Tour from "@/models/tourModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      tour_id: string;
    };
  }
) {
  try {
    // await validateApiRequest(req);
    const tour = await Tour.findById(params.tour_id);
    return NextResponse.json({ data:tour });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { tour_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Tour.updateOne({ _id: params.tour_id }, reqBody);
    return NextResponse.json({ message: "tour updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { tour_id: string } }
) {
  try {
    await validateApiRequest(req);
    await Tour.deleteOne({ _id: params.tour_id });
    return NextResponse.json({ message: "tour deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
