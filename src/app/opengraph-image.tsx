import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.seoTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, composed at build time. Rendered from JSX rather than shipped
 * as a bitmap so it stays in sync with the brand line and needs no design
 * round-trip to update.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05070e",
          backgroundImage:
            "radial-gradient(60% 80% at 88% 20%, rgba(76,125,255,0.38) 0%, rgba(5,7,14,0) 62%)," +
            "radial-gradient(45% 60% at 98% 78%, rgba(155,107,255,0.32) 0%, rgba(5,7,14,0) 60%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              border: "2px solid #4c7dff",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 30, color: "#eef2fb", letterSpacing: -0.6 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: -2.6,
              color: "#eef2fb",
              display: "flex",
            }}
          >
            Built by experience.
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: -2.6,
              color: "#8ea9ff",
              display: "flex",
              marginTop: 6,
            }}
          >
            Expanded by AI.
          </div>
        </div>

        <div
          style={{
            fontSize: 26,
            color: "#a3b0cc",
            display: "flex",
            borderTop: "1px solid #1a2440",
            paddingTop: 26,
          }}
        >
          {site.domain}
        </div>
      </div>
    ),
    size,
  );
}
