import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Trans  from "@/models/transictionModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      trans_id: string;
    };
  }
) {
  try {
    await validateApiRequest(req);
    const trans = await Trans.findById(params.trans_id);
    return NextResponse.json({ data: trans});
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { trans_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Trans.updateOne({ _id: params.trans_id }, reqBody);
    return NextResponse.json({ message: "transiction updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { trans_id: string } }
) {
  try {
    await validateApiRequest(req);
    console.log("BACKEND ????" , params.trans_id)
    await Trans.deleteOne({ _id: params.trans_id });
    return NextResponse.json({ message: "transiction deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
