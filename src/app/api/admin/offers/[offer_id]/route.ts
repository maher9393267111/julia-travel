import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Offer from "@/models/offerModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      offer_id: string;
    };
  }
) {
  try {
    await validateApiRequest(req);
    const offer = await Offer.findById(params.offer_id);
    return NextResponse.json({ data: offer });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { offer_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Offer.updateOne({ _id: params.offer_id }, reqBody);
    return NextResponse.json({ message: "offer updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { offer_id: string } }
) {
  try {
    await validateApiRequest(req);
    console.log("BACKEND ????" , params.offer_id)
    await Offer.deleteOne({ _id: params.offer_id });
    return NextResponse.json({ message: "offer deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
