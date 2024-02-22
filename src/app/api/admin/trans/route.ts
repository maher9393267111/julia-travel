import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Trans from "@/models/transictionModel";
import { NextResponse, NextRequest } from "next/server";
import { FilterQuery } from "mongoose";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const url = new URL(req.url);
    const person = url.searchParams.get("person");

    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    // const = url.searchParams.get("location");

    // workaround typescript, da await Post.find(username && { username }) mit einer Warnung daherkommt
    let filter: FilterQuery<any> = {};
    // ||

    if (person) {
      filter.person = Number(person);
    }

    if (from) {
      filter.from = from;
    }

    if (to) {
      filter.to = to;
    }

    console.log("FILTER OBJECT", filter);

    const trans = await Trans.find(filter);
    return NextResponse.json({ data: trans });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const trans = new Trans(reqBody);
    await trans.save();
    return NextResponse.json({ data: trans });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
