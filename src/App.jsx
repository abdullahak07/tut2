import React from "react";

function Card({ title, children, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "20px",
        background: "#ffffff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        flex: "1 1 260px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.06)";
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 10, fontSize: "1.2rem" }}>
        {title}
      </h2>
      <div style={{ color: "#4b5563", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        <div
          style={{
            background: "#111827",
            color: "white",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 12px 30px rgba(17,24,39,0.18)",
            marginBottom: "26px",
          }}
        >
          <p style={{ margin: 0, opacity: 0.85, letterSpacing: "0.06em" }}>
            ICT619
          </p>
          <h1 style={{ margin: "8px 0 10px", fontSize: "2rem" }}>
            Tutorial 2
          </h1>
          <p style={{ margin: 0, color: "#d1d5db", lineHeight: 1.7 }}>
            A simple Vercel-ready React site for explaining common AI search
            algorithms.
          </p>
        </div>

        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          <Card
            title="Breadth First Search"
            onClick={() => alert("BFS section clicked")}
          >
            Explores nodes level by level and guarantees the shortest path in an
            unweighted graph.
          </Card>

          <Card
            title="Depth First Search"
            onClick={() => alert("DFS section clicked")}
          >
            Explores one path deeply before backtracking. Useful for traversal
            and recursive search.
          </Card>

          <Card title="Uniform Cost Search">
            Always expands the least-cost path first, making it suitable for
            weighted graphs.
          </Card>
        </div>

        <div
          style={{
            marginTop: "24px",
            background: "#ffffff",
            borderRadius: "16px",
            padding: "22px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Deployment Notes</h3>
          <p style={{ marginBottom: 0, color: "#4b5563", lineHeight: 1.7 }}>
            This package uses Vite + React and is configured for direct
            deployment on Vercel.
          </p>
        </div>
      </div>
    </div>
  );
}
