import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Black Box — How AI Actually Works";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#05070e",
          color: "#eef2fb",
          padding: "72px 78px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            right: -130,
            top: -40,
            borderRadius: "50%",
            border: "2px solid rgba(76,125,255,0.42)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 470,
            height: 470,
            right: -55,
            top: 35,
            borderRadius: "50%",
            border: "2px solid rgba(155,107,255,0.36)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            right: 315,
            top: 219,
            borderRadius: "50%",
            background: "#45e0d2",
            boxShadow: "0 0 30px #45e0d2",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", width: 780, justifyContent: "space-between" }}>
          <div style={{ display: "flex", color: "#6d97ff", fontSize: 18, letterSpacing: 4 }}>
            COLIN&apos;S AI / INVESTIGATION 001
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 78, fontWeight: 700, letterSpacing: -4, lineHeight: 0.98 }}>
              It sounded alive.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: 54,
                fontWeight: 700,
                letterSpacing: -2,
                color: "#9b6bff",
              }}
            >
              Open the Black Box.
            </div>
            <div style={{ display: "flex", marginTop: 30, color: "#a3b0cc", fontSize: 25, lineHeight: 1.4 }}>
              Watch an AI response get manufactured one token at a time.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#7188b4", fontSize: 20 }}>
            <div style={{ width: 34, height: 2, background: "#45e0d2", display: "flex" }} />
            colinsai.com/investigations/black-box
          </div>
        </div>
      </div>
    ),
    size,
  );
}
