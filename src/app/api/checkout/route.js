import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { size } = body;

    // цены в центах
    const price = size === "A3" ? 3000 : 2000;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pencil Portrait",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/order",
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
