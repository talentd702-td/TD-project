"use client";

import React from "react";

export default function TalentDiscoveryApp() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #001122 0%, #003566 100%)",
        color: "white",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        🚧 Under Construction 🚧
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#ccc", maxWidth: "500px" }}>
        We’re working hard to improve your experience.<br />
        Please check back soon.
      </p>

      <div
        style={{
          marginTop: "3rem",
          opacity: 0.7,
          fontSize: "0.9rem",
          letterSpacing: "0.05em",
        }}
      >
        © {new Date().getFullYear()} Talent Discoveri · All Rights Reserved
      </div>
    </div>
  );
}
