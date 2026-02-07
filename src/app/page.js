"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Pencil Portraits</h1>

        <p style={subtitle}>Order your personal portrait from a photo</p>

        <img
          src="/avatar.jpg"
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            objectFit: "cover",
            margin: "20px auto",
            display: "block",
          }}
        />

        <h3>About the artist</h3>

        <p style={text}>
          I am a professional pencil artist with over <b>10 years of experience</b>.
          Every portrait is carefully hand-drawn on real paper — not digital.
          My work focuses on realistic and emotional portraits of people and pets.
          Each piece is created individually with attention to detail.
        </p>

        <div style={checks}>
          ✓ Hand-drawn on real paper<br />
          ✓ Worldwide shipping available<br />
          ✓ Secure payment via Stripe<br />
          ✓ Personal customer support
        </div>

        <p style={footer}>
          Your finished portrait will be safely packaged and shipped directly to your address.
        </p>

        <button style={button} onClick={() => router.push("/order")}>
          Order your portrait
        </button>
      </div>
    </div>
  );
}

/* styles */

const page = {
  minHeight: "100vh",
  background: "#000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  maxWidth: 420,
  padding: 30,
  color: "white",
  textAlign: "center",
};

const title = {
  fontSize: 38,
  marginBottom: 10,
};

const subtitle = {
  opacity: 0.7,
};

const text = {
  opacity: 0.8,
  lineHeight: 1.6,
};

const checks = {
  marginTop: 20,
  lineHeight: 2,
};

const footer = {
  marginTop: 20,
  opacity: 0.6,
};

const button = {
  marginTop: 30,
  width: "100%",
  padding: 16,
  background: "white",
  color: "black",
  border: "none",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: "bold",
  cursor: "pointer",
};
