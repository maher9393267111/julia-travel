import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Car from "@/models/carModel";
import { NextResponse, NextRequest } from "next/server";
import { FilterQuery } from "mongoose";
connectDB();

export async function GET(req: NextRequest) {
  try {
    // await validateApiRequest(req);


    const url = new URL(req.url);
    // const person = url.searchParams.get("person");
    const title = url.searchParams.get("title");
    const type = url.searchParams.get("type");
    const vites = url.searchParams.get("vitestype");
    const fueltype = url.searchParams.get("fueltype");
    const capacity= url.searchParams.get("capacity");
    const limit = url.searchParams.get("limit");
  
    let filter: FilterQuery<any> = {};
    // ||

  

    if (title) {
         filter.title =   { $regex: title, $options: 'i' } 
    }


    
 

    if (type) {
      filter.type = type;
    }

    if (vites) {
      filter.vites =vites;
    }

    if (fueltype) {
      filter.Fueltype =fueltype;
    }


    
    if (capacity) {
      filter.capacity =Number(capacity);
    }




    console.log("FILTER OBJECT", filter);




    const cars = await Car.find(filter);
    return NextResponse.json({ data: cars });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const car = new Car(reqBody);
    await car.save();
    return NextResponse.json({ data: car });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
