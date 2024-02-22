import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Tour from "@/models/tourModel";
import { NextResponse, NextRequest } from "next/server";
import { FilterQuery } from "mongoose";
connectDB();

export async function GET(req: NextRequest) {
  try {
    // await validateApiRequest(req);


    const url = new URL(req.url);
    const location = url.searchParams.get("location");
    const type= url.searchParams.get("type");
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const limit= url.searchParams.get("limit");
    // const = url.searchParams.get("location");

    // workaround typescript, da await Post.find(username && { username }) mit einer Warnung daherkommt
    let filter: FilterQuery<any> = {};
    // ||

    if (location) {
      filter.location = location;
    }

    if (type) {
      filter.type = type;
      // filter.title =   { $regex: title, $options: 'i' } 
    }

    if (from) {
      filter.from = from;
    }

    if (to) {
      filter.to = to;
    }


    console.log("FILTER OBJECT" , filter)


    const tours =
     limit ? await Tour.find(filter).sort({ createdAt: -1 }).limit(3)  : 
    await Tour.find(filter).sort({ createdAt: -1 });
    console.log("TOURS RESULT--<>>>" , tours)
    return NextResponse.json({ data: tours });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const tour= new Tour(reqBody);
    await tour.save();
    return NextResponse.json({ data: tour });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
