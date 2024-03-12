import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Flight from "@/models/flightModel";
import { NextResponse, NextRequest } from "next/server";
import { FilterQuery } from "mongoose";
connectDB();

export async function GET(req: NextRequest) {
  try {
    // await validateApiRequest(req);

    const url = new URL(req.url);
    // const person = url.searchParams.get("person");

    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const limit = url.searchParams.get("limit");
    // const = url.searchParams.get("location");

    // workaround typescript, da await Post.find(username && { username }) mit einer Warnung daherkommt
    let filter: FilterQuery<any> = {};
    // ||

    // if (person) {
    //   filter.person = Number(person);
    // }

    if (from) {
      filter.from = from;
    }

    if (to) {
      filter.to = to;
    }

    console.log("FILTER OBJECT", filter);

    const flights = limit ?  await Flight.find(filter).sort({ createdAt: -1 }).limit(3)  :  await Flight.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ data: flights });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const flight = new Flight(reqBody);
    await flight.save();
    return NextResponse.json({ data: flight });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
