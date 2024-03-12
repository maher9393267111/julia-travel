import * as nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";

const passw = "fzdy cfwt phtv nedl";
//"bbvh hors bgbq pxjm";
const emails = "juliatoursagency@gmail.com";
//"noreply.springworthbooks@gmail.com";

export async function POST(req) {
  try {
    const reqBody = await req.json();

    const transporter = nodemailer.createTransport({
      
      

      pass: passw,
      port: 465,
      host: "smtp.gmail.com",

      secure: true,
      auth: {
        user: emails,
        pass: passw,
      },


      // host:"smtp.mailtrap.io",
      // port:2525,
      // auth:{
      //     user:"c5ee5aac939502",
      //     pass: "254ccd3148f88c"
      // }

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

    let htmTemplate = null;
    const defaultYear = new Date().getFullYear();

    if (service === "hotels") {
      htmTemplate = `

<body style="background: #f3f4f6; padding:0 5px;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px 0; font-family:Trebuchet MS;">
<div style="text-align: center; margin-bottom: 20px;">
 <h1 style="color: #000; text-transform: uppercase; font-size: 30px;">You have new message from your website</h1>
</div>
<div style="padding: 10px; border-radius:5px; background:#fff; -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);">
    <h2 style="text-align: center; text-transform: uppercase; color: teal;">New message</h2>
    <p style="font-size:1rem;"><strong>Service Type: </strong> ${service}</p>
    <p style="font-size:1rem;"><strong>Service title: </strong> ${details.title}</p>
    <p style="font-size:1rem;"><strong>Service price: </strong> ${details.price}</p>
    <p style="font-size:1rem;"><strong>Days: </strong> ${daysNum}</p>
    <p style="font-size:1rem;"><strong>Adults Number: </strong> ${adultsNum}</p>
    <p style="font-size:1rem;"><strong>Childrens Number: </strong> ${ChildrensNum}</p>
    <p style="font-size:1rem;"><strong>Start Date: </strong> ${startDate}   -  ${endDate}</p>
    <p style="font-size:1rem;"><strong>Name: </strong> ${name}</p>
    <p style="font-size:1rem;"><strong>Email: </strong> ${email}</p>
    <p style="font-size:1rem;"><strong>Phone: </strong> ${phone}</p>

    <p style="font-size:1rem;"><strong>Total Price: </strong> ${reqBody.totalprice}</p
    <p style="font-size:1rem;"><strong>Offer Type: </strong> ${reqBody.offertype}</p
   
    <p style="font-size:1rem;"><strong>Message: </strong> ${message}</p>

</div>
</div>

<footer style="text-align: center; padding: 5px 0; color: #000; font-size: 1rem;">
<h2>Julia Tours</h2>
<p>© ${defaultYear} All rights reserved</p>
</footer>
</body>
`;
    }

    if (service === "tours") {
      htmTemplate = `

<body style="background: #f3f4f6; padding:0 5px;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px 0; font-family:Trebuchet MS;">
<div style="text-align: center; margin-bottom: 20px;">
 <h1 style="color: #000; text-transform: uppercase; font-size: 30px;">You have new message from your website</h1>
</div>
<div style="padding: 10px; border-radius:5px; background:#fff; -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);">
    <h2 style="text-align: center; text-transform: uppercase; color: teal;">New message</h2>
    <p style="font-size:1rem;"><strong>Service Type: </strong> ${service}</p>
    <p style="font-size:1rem;"><strong>Service title: </strong> ${details.title}</p>
    <p style="font-size:1rem;"><strong>Service price: </strong> ${details.price}</p>
    <p style="font-size:1rem;"><strong>Days: </strong> ${daysNum}</p>
    <p style="font-size:1rem;"><strong>Adults Number: </strong> ${adultsNum}</p>
    
    <p style="font-size:1rem;"><strong>Start Date: </strong> ${startDate}   -  ${endDate}</p>
    <p style="font-size:1rem;"><strong>Name: </strong> ${name}</p>
    <p style="font-size:1rem;"><strong>Email: </strong> ${email}</p>
    <p style="font-size:1rem;"><strong>Phone: </strong> ${phone}</p>
   
    <p style="font-size:1rem;"><strong>Message: </strong> ${message}</p>
    
    <p style="font-size:1rem;"><strong>Total Price: </strong> ${reqBody.totalprice}</p>
</div>
</div>

<footer style="text-align: center; padding: 5px 0; color: #000; font-size: 1rem;">
<h2>Julia Tours</h2>
<p>© ${defaultYear} All rights reserved</p>
</footer>
</body>
`;
    }

    if (service === "visa") {
      htmTemplate = `

<body style="background: #f3f4f6; padding:0 5px;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px 0; font-family:Trebuchet MS;">
<div style="text-align: center; margin-bottom: 20px;">
 <h1 style="color: #000; text-transform: uppercase; font-size: 30px;">You have new message from your website</h1>
</div>
<div style="padding: 10px; border-radius:5px; background:#fff; -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);">
    <h2 style="text-align: center; text-transform: uppercase; color: teal;">New message</h2>
    <p style="font-size:1rem;"><strong>Service Type: </strong> ${service}</p>
    <p style="font-size:1rem;"><strong>Service title: </strong> ${details.title}</p>
    <p style="font-size:1rem;"><strong>Service price: </strong> ${details.price}</p>
  
    <p style="font-size:1rem;"><strong>Visa country: </strong> ${details.country}</p>
    <p style="font-size:1rem;"><strong>Visa nationality: </strong> ${details.nationality}</p>
    <p style="font-size:1rem;"><strong>Visa type: </strong> ${details.type}</p>
    <p style="font-size:1rem;"><strong>Name: </strong> ${name}</p>
    <p style="font-size:1rem;"><strong>Email: </strong> ${email}</p>
    <p style="font-size:1rem;"><strong>Phone: </strong> ${phone}</p>
   
    <p style="font-size:1rem;"><strong>Message: </strong> ${message}</p>
</div>
</div>

<footer style="text-align: center; padding: 5px 0; color: #000; font-size: 1rem;">
<h2>Julia Tours</h2>
<p>© ${defaultYear} All rights reserved</p>
</footer>
</body>
`;
    }

    if (service === "transport") {
      htmTemplate = `

<body style="background: #f3f4f6; padding:0 5px;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px 0; font-family:Trebuchet MS;">
<div style="text-align: center; margin-bottom: 20px;">
 <h1 style="color: #000; text-transform: uppercase; font-size: 30px;">You have new message from your website</h1>
</div>
<div style="padding: 10px; border-radius:5px; background:#fff; -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);">
    <h2 style="text-align: center; text-transform: uppercase; color: teal;">New message</h2>
    <p style="font-size:1rem;"><strong>Service Type: </strong> ${service}</p>
    <p style="font-size:1rem;"><strong>Service title: </strong> ${details.title}</p>
    <p style="font-size:1rem;"><strong>Service price: </strong> ${details.price}</p>
    <p style="font-size:1rem;"><strong>Transport type : </strong> ${reqBody?.transportType}</p>
    <p style="font-size:1rem;"><strong>Transport from : </strong> ${details.from}</p>
    <p style="font-size:1rem;"><strong>Transport to: </strong> ${details.to}</p>
    <p style="font-size:1rem;"><strong>person number : </strong> ${adultsNum}</p>
    <p style="font-size:1rem;"><strong>Name: </strong> ${name}</p>
    <p style="font-size:1rem;"><strong>Email: </strong> ${email}</p>
    <p style="font-size:1rem;"><strong>Phone: </strong> ${phone}</p>
   
    <p style="font-size:1rem;"><strong>Message: </strong> ${message}</p>
</div>
</div>

<footer style="text-align: center; padding: 5px 0; color: #000; font-size: 1rem;">
<h2>Julia Tours</h2>
<p>© ${defaultYear} All rights reserved</p>
</footer>
</body>
`;
    }

    if (service === "flight") {
      htmTemplate = `

<body style="background: #f3f4f6; padding:0 5px;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px 0; font-family:Trebuchet MS;">
<div style="text-align: center; margin-bottom: 20px;">
 <h1 style="color: #000; text-transform: uppercase; font-size: 30px;">You have new message from your website</h1>
</div>
<div style="padding: 10px; border-radius:5px; background:#fff; -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);">
    <h2 style="text-align: center; text-transform: uppercase; color: teal;">New message</h2>
    <p style="font-size:1rem;"><strong>Service Type: </strong> ${service}</p>
    <p style="font-size:1rem;"><strong>Service title: </strong> ${details.title}</p>
    <p style="font-size:1rem;"><strong>Service price: </strong> ${details.price}</p>
    
    <p style="font-size:1rem;"><strong>Flight from : </strong> ${details.from}</p>
    <p style="font-size:1rem;"><strong>Flight to: </strong> ${details.to}</p>
    <p style="font-size:1rem;"><strong>person number : </strong> ${adultsNum}</p>
    <p style="font-size:1rem;"><strong>Name: </strong> ${name}</p>
    <p style="font-size:1rem;"><strong>Email: </strong> ${email}</p>
    <p style="font-size:1rem;"><strong>Phone: </strong> ${phone}</p>
   
    <p style="font-size:1rem;"><strong>Message: </strong> ${message}</p>
</div>
</div>

<footer style="text-align: center; padding: 5px 0; color: #000; font-size: 1rem;">
<h2>Julia Tours</h2>
<p>© ${defaultYear} All rights reserved</p>
</footer>
</body>
`;
    }

    if (service === "package") {
      htmTemplate = `

<body style="background: #f3f4f6; padding:0 5px;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px 0; font-family:Trebuchet MS;">
<div style="text-align: center; margin-bottom: 20px;">
 <h1 style="color: #000; text-transform: uppercase; font-size: 30px;">You have new message from your website</h1>
</div>
<div style="padding: 10px; border-radius:5px; background:#fff; -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);">
    <h2 style="text-align: center; text-transform: uppercase; color: teal;">New message</h2>
    <p style="font-size:1rem;"><strong>Service Type: </strong> ${service}</p>
    <p style="font-size:1rem;"><strong>Service title: </strong> ${details.title}</p>
    <p style="font-size:1rem;"><strong>Service price: </strong> ${details.price}</p>
    <p style="font-size:1rem;"><strong>Total price: </strong> ${reqBody.totalprice}</p>

    <p style="font-size:1rem;"><strong>person number : </strong> ${adultsNum}</p>
    <p style="font-size:1rem;"><strong>Name: </strong> ${name}</p>
    <p style="font-size:1rem;"><strong>Email: </strong> ${email}</p>
    <p style="font-size:1rem;"><strong>Phone: </strong> ${phone}</p>
   
    <p style="font-size:1rem;"><strong>Message: </strong> ${message}</p>
</div>
</div>

<footer style="text-align: center; padding: 5px 0; color: #000; font-size: 1rem;">
<h2>Julia Tours</h2>
<p>© ${defaultYear} All rights reserved</p>
</footer>
</body>

`;
    }

    if (service === "rental") {
      htmTemplate = `

<body style="background: #f3f4f6; padding:0 5px;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px 0; font-family:Trebuchet MS;">
<div style="text-align: center; margin-bottom: 20px;">
 <h1 style="color: #000; text-transform: uppercase; font-size: 30px;">You have new message from your website</h1>
</div>
<div style="padding: 10px; border-radius:5px; background:#fff; -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3); box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);">
    <h2 style="text-align: center; text-transform: uppercase; color: teal;">New message</h2>
    <p style="font-size:1rem;"><strong>Service Type: </strong> ${service}</p>
    <p style="font-size:1rem;"><strong>Service title: </strong> ${details.title}</p>
    <p style="font-size:1rem;"><strong>Service price: </strong> ${details.price}</p>
    <p style="font-size:1rem;"><strong>Total price: </strong> ${reqBody.totalprice}</p>
    <p style="font-size:1rem;"><strong>Days number : </strong> ${daysNum}</p>
    
    
    <p style="font-size:1rem;"><strong>Name: </strong> ${name}</p>
    <p style="font-size:1rem;"><strong>Email: </strong> ${email}</p>
    <p style="font-size:1rem;"><strong>Phone: </strong> ${phone}</p>
   
    <p style="font-size:1rem;"><strong>Message: </strong> ${message}</p>
</div>
</div>

<footer style="text-align: center; padding: 5px 0; color: #000; font-size: 1rem;">
<h2>Julia Tours</h2>
<p>© ${defaultYear} All rights reserveddd</p>
</footer>
</body>

`;
    }

    const mailOptions = {
      from: email,
      to: ["basma94ghanem@gmail.com" ,reqBody.email],
      subject: `Message from ${name}`,
      subject: `Contact Message from ${email}`,
      html: htmTemplate,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ data: "success" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
