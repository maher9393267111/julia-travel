import * as nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";
import { email_template } from "./emailTemplate";

const passw = "bbvh hors bgbq pxjm";
const emails = "noreply.springworthbooks@gmail.com";

export async function POST(req) {
  try {
    const reqBody = await req.json();

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      // user: emails, // generated ethereal user
      pass: passw, // generated ethereal password

      port: 465,
      host: "smtp.gmail.com",

      secure: true, // use SSL
      auth: {
        user: emails,
        pass: passw,
      },
    });

    const {
      name,
      email,
      phone,
      message,
      startDate,
      endDate,
      adultsNum,
      ChildrensNum,
      daysNum,
      service,
      details,
    } = reqBody;

    const htmTemplate = `<h2>Email sent from a  ${name}

    </br>
    
    
    
   
  
    <h1>customer name : ${name}</h1>
    <h1>customer email : ${email}</h1>
    <h1> customer Phone: ${phone}</h1>
    <h1>customer Message: ${message}</h1>
    

  
    >
    
    
    </h2>`;

    const mailOptions = {
      from: email,
      to: "basma94ghanem@gmail.com",
      subject: `Message from ${name}`,
      subject: `Contact Message from ${email}`,
      html: email_template(reqBody),
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ data: "success" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
