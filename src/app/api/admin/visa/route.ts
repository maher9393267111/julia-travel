import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Visa from "@/models/visaModel";
import { NextResponse, NextRequest } from "next/server";
import { FilterQuery } from "mongoose";
connectDB();

export async function GET(req: NextRequest) {
  try {
    // await validateApiRequest(req);


    const url = new URL(req.url);
    const country = url.searchParams.get("country");
    const nationality = url.searchParams.get("nationality");
    const type = url.searchParams.get("type");

    const limit = url.searchParams.get("limit");
    // const = url.searchParams.get("location");

    // workaround typescript, da await Post.find(username && { username }) mit einer Warnung daherkommt
    let filter: FilterQuery<any> = {};
    // ||

    if (country) {
      filter.country = country;
    }

    if (nationality) {
      filter.nationality = nationality;
    }


    if (type) {
      filter.type = type;
    }






    const visas = limit ?   await Visa.find(filter).sort({ createdAt: -1 }).limit(3)  : await Visa.find(filter).sort({ createdAt: -1 });
   // console.log("visa All data---<>" , filter,  visas)
    return NextResponse.json({ data: visas });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);

console.log("visa post data---<>" ,  reqBody)


    const visa = new Visa(reqBody);
    await visa.save();
    return NextResponse.json({ data: visa});
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
