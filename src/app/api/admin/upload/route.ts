import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { message } from "antd";

// prepare S3 client
const bucketName = "dash93";
const region = "us-east-1";
const accessKeyId = "DO00PHUUAT4VXQF27H6N";
// "DO00M9XA6DJ9P9Y4UWFT";
const secretAccessKey = "P1YyD/tvykl7hpLKBF/g3Ff1KN2yJOunrRlWSXGRa5s";
// "fcWJxA4nn0r5yNKUi1011UzQ66FPMO6Lt8UEuGWSypE";

const endpoint = "https://nyc3.digitaloceanspaces.com";
const cdnEndpoint = "https://dash93.nyc3.digitaloceanspaces.com";

const s3Client = new S3Client({
  endpoint: endpoint,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

function s3Key(id: string) {
  return `julia/${id}.pdf`;
}

function s3Url(id: string) {
  return `${cdnEndpoint}/${s3Key(id)}`;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file)
    return NextResponse.json({ error: "missing file" }, { status: 400 });
  if (file.type !== "application/pdf")
    return NextResponse.json({ error: "invalid file" }, { status: 400 });

  const id = randomUUID();
  const buffer = await file.arrayBuffer();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key(id),
      ContentType: file.type,
      Body: Buffer.from(buffer),
      ACL: "public-read",
    })
  );

  return NextResponse.json({ id, url: s3Url(id) });
}

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: `julia/${s3Key(id)}`,
      })
    );
  } catch (e) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.redirect(s3Url(id));
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  console.log("IDDDDD" , id)
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: `julia/${id}.pdf`,
      })
    );

    return NextResponse.json({ message: "File Deleted Successfully" });
  } catch (e) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}

// if (oldfile) {
//     await s3.send(
//       new DeleteObjectCommand({
//         Bucket: "dash93",
//         Key: oldfile,
//       })
//     );
//   }
