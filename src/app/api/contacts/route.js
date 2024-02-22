// import { NextRequest, NextResponse } from "next/server"

// const passw = "bbvh hors bgbq pxjm";
// const email = "noreply.springworthbooks@gmail.com";

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   port: 465,
//   host: "smtp.gmail.com",

//   secure: true, // use SSL
//   auth: {
//     // user: "itesa.getViral@gmail.com",
//     // pass: "rtspkviskcrhorey",

//     user: email, // generated ethereal user
//     pass: passw, // generated ethereal password
//   },
// });

// async function sendEmail({
//   name,
//   email,
//   phone,
//   message,
//   startDate,
//   endDate,
//   adultsNum,
//   ChildrensNum,
// }) {
//   const emailOptions = {
//     form: email,
//     to: "basma94ghanem@gmail.com",
//     subject: `Contact Message from ${email}`,
//     html: `<h2>Email sent from a  ${name}

//     </br>

//     <h1>${phone}</h1>

//     <h1>${message}</h1>
//     <h1>Adults :${adultsNum}</h1>
//     <h1>Childrens : ${ChildrensNum}</h1>
//     <h1> Start Date :${startDate}  -   End Date : ${endDate}</h1>

//     </h2>`,
//   };

//   return transporter.sendMail(emailOptions);
// }

// export async function POST (req, res) {

//   try {

//     const body = await req.json();
//     console.log("DATA----<", body);
//     const emailRes = await sendEmail(body);
//     if (emailRes.messageId) {
//       return res.status(200).json({ message: `Email sent successfuly` });
//     }

//     return res.status(400).json({ message: "Error sending email" });

//   }
//   catch(err){
//     return res.status(401).json({ message: err });
//   }

// }

import * as nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";

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
      details
    } = reqBody;

    let htmTemplate = "";

    if (service === "hotels") {
      htmTemplate = `<h2>Email sent from a  ${name}

</br>



<h1>Service Type : ${service}</h1>
<h1>Name : ${details?.title}</h1>
<h1>Days : ${daysNum}</h1>
<h1>${phone}</h1>

<h1>${message}</h1>
<h1>Adults :${adultsNum}</h1>
<h1>Childrens : ${ChildrensNum}</h1>
<h1> Start Date :${startDate}  -   End Date : ${endDate}</h1>

</h2>`;
    }

    if (service === "tours") {
      htmTemplate = `<h2>Email sent from a  ${name}

</br>



<h1>Service Type : ${service}</h1>
<h1>Tour Name : ${details?.title}</h1>
<h1>customer name : ${name}</h1>
<h1>customer email : ${email}</h1>
<h1> customer Phone: ${phone}</h1>
<h1>customer Message: ${message}</h1>
<h1>Days : ${daysNum}</h1>
<h1>${phone}</h1>

<h1>${message}</h1>
<h1>Adults :${adultsNum}</h1>

<h1> Start Date :${startDate}  -   End Date : ${endDate}</h1>

</h2>`;
    }


    if (service === "visa") {
      htmTemplate = `<h2>Email sent from a  ${name}

</br>



<h1>Service Type : ${service}</h1>
<h1>customer name : ${name}</h1>
<h1>customer email : ${email}</h1>
<h1> customer Phone: ${phone}</h1>
<h1>customer Message: ${message}</h1>
<h1>Visa Name : ${details?.title}</h1>
<h1>Visa type : ${details?.type}</h1>
<h1>Visa nationality : ${details?.nationality}</h1>
<h1>Visa country : ${details?.country}</h1>
<h1> Phone: ${phone}</h1>

<h1> Message: ${message}</h1>
>


</h2>`;
    }


    
    if (service === "transport") {
      htmTemplate = `<h2>Email sent from a  ${name}

</br>



<h1>Service Type : ${service}</h1>
<h1>Transport Name : ${details?.title}</h1>
<h1>customer name : ${name}</h1>
<h1>customer email : ${email}</h1>
<h1> customer Phone: ${phone}</h1>
<h1>customer Message: ${message}</h1>
<h1>Transport Type : ${reqBody?.transportType}</h1>
<h1>Transport Name : ${details?.title}</h1>
<h1>Transport price : ${details?.price}</h1>
<h1>Transport From : ${details?.from}</h1>
<h1>Transport To : ${details?.to}</h1>
<h1>Transport person number : ${adultsNum}</h1>
<h1>Transport Start Date :${startDate}  -   End Date : ${endDate}</h1>
<h1> Phone: ${phone}</h1>




<h1> Message: ${message}</h1>
>


</h2>`;
    }



    if (service === "flight") {
      htmTemplate = `<h2>Email sent from a  ${name}

</br>



<h1>Service Type : ${service}</h1>
<h1>Flight Name : ${details?.title}</h1>
<h1>customer name : ${name}</h1>
<h1>customer email : ${email}</h1>
<h1> customer Phone: ${phone}</h1>
<h1>customer Message: ${message}</h1>
<h1>Service Type : ${service}</h1>
<h1>Flight Name : ${details?.title}</h1>
<h1>Flight price : ${details?.price}</h1>
<h1>Flight From : ${details?.from}</h1>
<h1>Flight To : ${details?.to}</h1>
<h1>Flight person number : ${adultsNum}</h1>
<h1>Flight Start Date :${startDate}  -   End Date : ${endDate}</h1>

>


</h2>`;
    }




    const mailOptions = {
      from: email,
      to: "basma94ghanem@gmail.com",
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

//  export async function POST(req ,res) {
//  const transporter = nodemailer.createTransport({
//   port: 465,
//      host: "smtp.gmail.com",
//    // user: emails, // generated ethereal user
//          pass: passw, // generated ethereal password

//            port: 465,
//            host: "smtp.gmail.com",

//             secure: true, // use SSL
//            auth: {

//              user: emails,
//              pass: passw,
//            },

//   });

//   const { name, email, message } = req.body;
//   const mailOptions= {
//     from: email,
//     to: "basma94ghanem@gmail.com",
//     subject: `Message from ${name}`,
//     text: message,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return NextResponse.status(200).json({ message: "Success: email was sent" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" });

//   }
// }
