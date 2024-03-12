import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Hotel from "@/models/hotelModel";
import { NextResponse, NextRequest } from "next/server";
import { FilterQuery } from "mongoose";
connectDB();

export async function GET(req: NextRequest) {
  try {
    // await validateApiRequest(req);

    const url = new URL(req.url);
    const discount = url.searchParams.get("discount");
    
    const location = url.searchParams.get("location");

    const title = url.searchParams.get("title");
    const roomType = url.searchParams.get("roomType");
    const limit = url.searchParams.get("limit");
     const cities = url.searchParams.get("cities");

    // workaround typescript, da await Post.find(username && { username }) mit einer Warnung daherkommt
    let filter: FilterQuery<any> = {};
    // ||

    if (location) {
      const loc = location.replace(/\s/g, '');
      filter.location = loc;
      // filter.location = location;
    }

    if (cities) {
console.log("cities" ,cities)
      const citiesformat =  cities.split(',')
      filter.city =  {$in: citiesformat} }



    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (roomType) {
      filter.roomtype = roomType;
    }

    if (discount) {
      filter.discount = { $gte: 0 };
      filter.offer = { $gte: 0 };
    }

    console.log("FILTER hotels", filter, discount);

    const hotels = limit
      ? await Hotel.find(filter).sort({ createdAt: -1 }).limit(3)
      : await Hotel.find(filter).sort({ createdAt: -1 });
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
