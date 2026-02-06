"use client";

import { useState } from "react";

export default function OrderPage() {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [size, setSize] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    street: "",
    zip: "",
    note: "",
  });

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!photo) return alert("Add photo");
    if (!size) return alert("Choose size");

    setLoading(true);

    try {
      const data = new FormData();
      data.append("photo", photo);
      data.append("size", size);

      Object.entries(form).forEach(([k, v]) =>
        data.append(k, v)
      );

      await fetch("/api/send-photo", {
        method: "POST",
        body: data,
      });

      const checkout = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ size }),
      });

      const res = await checkout.json();

      if (!res.url) throw new Error("Stripe error");

      window.location.href = res.url;
    } catch (e) {
      alert("Payment error");
      setLoading(false);
    }
  }

  return (
    <div style={page}>
      <div style={card}>

        <h2 style={title}>Order Portrait</h2>

        {/* TRUST */}

        <div style={trust}>
          ✔ Cancel your order within 24 hours — full refund guaranteed<br/>
          ✔ I personally draw your portrait by hand<br/>
          ✔ Final artwork shipped to your address
        </div>

        {/* PHOTO */}

        <label style={upload}>
          {preview ? (
            <>
              <img src={preview} style={img} />
              <div style={check}>✓ Photo added</div>
            </>
          ) : (
            "+ Add a photo"
          )}
          <input hidden type="file" onChange={handlePhoto} />
        </label>

        {/* SIZE */}

        <select value={size} onChange={(e)=>setSize(e.target.value)} style={select}>
          <option value="">Choose size</option>
          <option value="A3">A3 — CHF 30</option>
          <option value="A4">A4 — CHF 20</option>
        </select>

        {/* ADDRESS BUTTON */}

        <button style={addrBtn} onClick={()=>setShowAddress(!showAddress)}>
          Add shipping address
        </button>

        {/* ADDRESS */}

        {showAddress && (
          <div style={addrWrap}>
            <input style={input} placeholder="Full name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
            <input style={input} placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
            <input style={input} placeholder="Country" onChange={(e)=>setForm({...form,country:e.target.value})}/>
            <input style={input} placeholder="City" onChange={(e)=>setForm({...form,city:e.target.value})}/>
            <input style={input} placeholder="Street address" onChange={(e)=>setForm({...form,street:e.target.value})}/>
            <input style={input} placeholder="ZIP / Postal code" onChange={(e)=>setForm({...form,zip:e.target.value})}/>
            <textarea style={input} placeholder="Note (optional)" onChange={(e)=>setForm({...form,note:e.target.value})}/>
          </div>
        )}

        {/* PAY */}

        <button
          style={{...pay, opacity: loading ? 0.6 : 1}}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Pay & Order"}
        </button>

      </div>
    </div>
  );
}

/* ---------------- STYLE ---------------- */

const page = {
  minHeight: "100vh",
  background: "#0f0f0f",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: 380,
  padding: 30,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  color: "white",
};

const title = {
  textAlign: "center",
};

const trust = {
  fontSize: 13,
  lineHeight: "1.6",
  opacity: 0.85,
};

const upload = {
  border: "2px dashed #666",
  padding: 40,
  textAlign: "center",
  cursor: "pointer",
};

const img = {
  width: "100%",
  borderRadius: 6,
};

const check = {
  marginTop: 6,
  color: "#7CFF7C",
};

const select = {
  background: "#111",
  border: "1px solid #aaa",
  color: "white",
  padding: 12,
};

const addrBtn = {
  border: "1px solid #c9a86a",
  background: "transparent",
  color: "white",
  padding: 12,
};

const addrWrap = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const input = {
  background: "#111",
  border: "1px solid #666",
  color: "white",
  padding: 10,
};

const pay = {
  marginTop: 10,
  background: "#c9a86a",
  border: "none",
  padding: 14,
  fontWeight: "bold",
  cursor: "pointer",
};
