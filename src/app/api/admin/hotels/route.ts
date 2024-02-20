import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Hotel from "@/models/hotelModel";
import { NextResponse, NextRequest } from "next/server";
import { FilterQuery } from "mongoose";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);

    const url = new URL(req.url);
    const location = url.searchParams.get("location");
    const title = url.searchParams.get("title");
    const roomType = url.searchParams.get("roomType");
    // const = url.searchParams.get("location");

    // workaround typescript, da await Post.find(username && { username }) mit einer Warnung daherkommt
    let filter: FilterQuery<any> = {};
    // ||

    if (location) {
      filter.location = location;
    }

    if (title) {
      filter.title =   { $regex: title, $options: 'i' } 
    }

    if (roomType) {
      filter.roomtype = roomType;
    }



    const hotels = await Hotel.find(filter);
    return NextResponse.json({ data: hotels });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, errors: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    // await validateApiRequest(req);
    const hotel = new Hotel(reqBody);
    await hotel.save();
    return NextResponse.json({ data: hotel });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
