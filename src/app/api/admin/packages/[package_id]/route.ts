import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Package from "@/models/packageModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      package_id: string;
    };
  }
) {
  try {
    // await validateApiRequest(req);
    const category = await Package.findById(params.package_id);
    return NextResponse.json({ data: category });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { package_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Package.updateOne({ _id: params.package_id }, reqBody);
    return NextResponse.json({ message: "package updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { package_id: string } }
) {
  try {
    await validateApiRequest(req);
    await Package.deleteOne({ _id: params.package_id });
    return NextResponse.json({ message: "package deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
