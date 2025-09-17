import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0a0a0a",
          color: "#ededed",
          padding: 64,
          fontSize: 48,
        }}
      >
        <div style={{ opacity: 0.7, fontSize: 24 }}>Henry T. Wagner</div>
        <div style={{ fontWeight: 700 }}>Software Engineer — Portfolio</div>
        <div style={{ opacity: 0.7, fontSize: 20, marginTop: 12 }}>
          Projects • Experience • Contact
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
