import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const photo = formData.get("photo");
    const size = formData.get("size");

    const name = formData.get("name");
    const email = formData.get("email");
    const country = formData.get("country");
    const city = formData.get("city");
    const street = formData.get("street");
    const zip = formData.get("zip");
    const note = formData.get("note");

    if (!photo) {
      return NextResponse.json({ error: "No photo" }, { status: 400 });
    }

    const buffer = Buffer.from(await photo.arrayBuffer());

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP READY");

    // ===============================
    // EMAIL TO YOU (ORDER)
    // ===============================

    await transporter.sendMail({
      from: `"Portrait Order" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🖼 NEW PORTRAIT ORDER",
      html: `
<h2>NEW ORDER</h2>

<p><b>Size:</b> ${size}</p>

<hr/>

<p><b>Name:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>

<hr/>

<p><b>Country:</b> ${country}</p>
<p><b>City:</b> ${city}</p>
<p><b>Street:</b> ${street}</p>
<p><b>ZIP:</b> ${zip}</p>

<hr/>

<p><b>Note:</b><br/>${note || "-"}</p>
`,
      attachments: [
        {
          filename: photo.name,
          content: buffer,
        },
      ],
    });

    console.log("ORDER MAIL SENT");

    // ===============================
    // AUTO REPLY TO CLIENT
    // ===============================

    if (email) {
      await transporter.sendMail({
        from: `"Portrait Artist" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "✅ Your portrait order was received",
        html: `
<h2>Thank you for your order!</h2>

<p>Hi ${name || "friend"},</p>

<p>I received your photo and order successfully.</p>

<p>🎨 Your portrait will be personally drawn by me.</p>
<p>📦 Final artwork will be shipped to your address.</p>

<hr/>

<p><b>Order details:</b></p>
<p>Size: ${size}</p>

<hr/>

<p>If you cancel within 24 hours — full refund guaranteed.</p>

<p>I’ll contact you if I need anything else.</p>

<br/>

<p>— Your artist ✍️</p>
`,
      });

      console.log("CLIENT AUTO MAIL SENT");
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("MAIL ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

