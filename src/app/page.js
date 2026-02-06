export default function HomePage() {
  return (
    <main style={wrapper}>
      <div style={card}>
        <h1 style={title}>Pencil Portraits</h1>

        <p style={subtitle}>
          Hand-drawn pencil portraits from your photo.
          Simple. Elegant. Personal.
        </p>

        {/* ABOUT */}

        <div style={about}>
          <h2 style={sectionTitle}>About the artist</h2>

          <p>
            I am a professional pencil artist with over <strong>10 years of experience</strong>.
            Every portrait is carefully hand-drawn on real paper — not digital.
          </p>

          <p>
            My work focuses on realistic and emotional portraits of people and pets.
            Each piece is created individually with attention to detail.
          </p>

          <p>
            You can view examples of my work on Instagram and TikTok.
          </p>
        </div>

        {/* TRUST */}

        <div style={trust}>
          ✔ Hand-drawn on real paper<br />
          ✔ Worldwide shipping available<br />
          ✔ Secure payment via Stripe<br />
          ✔ Personal customer support
        </div>

        <p style={shipping}>
          Your finished portrait will be safely packaged and shipped directly to your address.
        </p>

        {/* ORDER BUTTON AT BOTTOM */}

        <a href="/order">
          <button style={button}>Order your portrait</button>
        </a>
      </div>
    </main>
  );
}

/* STYLES */

const wrapper = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top,#1b1b1b 0%,#0b0b0b 70%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
  fontFamily: "system-ui",
  color: "#eaeaea",
};

const card = {
  maxWidth: "560px",
  width: "100%",
  background: "#111",
  padding: "50px",
  borderRadius: "22px",
  textAlign: "center",
  boxShadow: "0 0 0 1px rgba(255,255,255,.05), 0 40px 90px rgba(0,0,0,.8)",
};

const title = {
  fontSize: "36px",
  marginBottom: "12px",
  color: "white",
};

const subtitle = {
  color: "#b5b5b5",
  lineHeight: "1.6",
  marginBottom: "32px",
};

const sectionTitle = {
  fontSize: "18px",
  marginBottom: "12px",
  color: "#fff",
};

const about = {
  textAlign: "left",
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#cfcfcf",
  marginBottom: "28px",
};

const trust = {
  marginBottom: "18px",
  color: "#9f9f9f",
  fontSize: "14px",
  lineHeight: "1.7",
};

const shipping = {
  fontSize: "13px",
  color: "#8a8a8a",
  marginBottom: "28px",
};

const button = {
  width: "100%",
  padding: "18px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg,#fff,#d6d6d6)",
  color: "#0e0e0e",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(255,255,255,.18)",
};
