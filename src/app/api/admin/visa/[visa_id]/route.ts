import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Visa from "@/models/visaModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      visa_id: string;
    };
  }
) {
  try {
    await validateApiRequest(req);
    const visa = await Visa.findById(params.visa_id);
    return NextResponse.json({ data: visa });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { visa_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    console.log("visa put data---<>" ,  reqBody)
    await Visa.updateOne({ _id: params.visa_id }, reqBody);
    return NextResponse.json({ message: "visa updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { visa_id: string } }
) {
  try {
    await validateApiRequest(req);
    await Visa.deleteOne({ _id: params.visa_id });
    return NextResponse.json({ message: "visa deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
