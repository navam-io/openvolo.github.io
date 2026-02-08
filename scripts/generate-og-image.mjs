import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load fonts
const plusJakartaBold = readFileSync(
  join(__dirname, "fonts", "PlusJakartaSans-Bold.ttf")
);
const interRegular = readFileSync(
  join(__dirname, "fonts", "Inter-Regular.ttf")
);
const jetbrainsMono = readFileSync(
  join(__dirname, "fonts", "JetBrainsMono-Regular.ttf")
);

// Load logo as base64 data URI
const logoBuffer = readFileSync(
  join(__dirname, "..", "public", "assets", "openvolo-logo-transparent.png")
);
const logoDataUri = `data:image/png;base64,${logoBuffer.toString("base64")}`;

const WIDTH = 1200;
const HEIGHT = 630;

// Brand colors (OKLCH approximations in hex for SVG)
const BG = "#1a1625"; // oklch(0.12 0.02 270)
const CYAN = "#0891b2";
const LAVENDER = "#a78bfa";
const PINK = "#ec4899";
const CORAL = "#f97316";
const MUTED = "#9ca3af";

const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        flexDirection: "column",
        backgroundColor: BG,
        fontFamily: "Plus Jakarta Sans",
        position: "relative",
        overflow: "hidden",
      },
      children: [
        // Top gradient bar
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: `linear-gradient(to right, ${CYAN}, ${LAVENDER}, ${PINK}, ${CORAL})`,
            },
          },
        },
        // Subtle glow behind logo area
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 80,
              left: 60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: CYAN,
              opacity: 0.06,
              filter: "blur(60px)",
            },
          },
        },
        // Main content area
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "80px 80px 60px",
              flexGrow: 1,
            },
            children: [
              // Logo + Name row
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    marginBottom: 32,
                  },
                  children: [
                    {
                      type: "img",
                      props: {
                        src: logoDataUri,
                        width: 72,
                        height: 72,
                        style: { borderRadius: 16 },
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: 64,
                          fontWeight: 700,
                          color: "#f0eef6",
                          fontFamily: "Plus Jakarta Sans",
                          lineHeight: 1,
                        },
                        children: "OpenVolo",
                      },
                    },
                  ],
                },
              },
              // Tagline
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 28,
                    fontWeight: 600,
                    color: "#d4d0e0",
                    fontFamily: "Plus Jakarta Sans",
                    marginBottom: 16,
                  },
                  children: "Your AI-Powered Social CRM",
                },
              },
              // Subtitle pills
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    gap: 12,
                    fontFamily: "Inter",
                    fontSize: 16,
                    color: MUTED,
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          padding: "6px 16px",
                          borderRadius: 20,
                          border: `1px solid rgba(156, 163, 175, 0.2)`,
                          backgroundColor: "rgba(156, 163, 175, 0.05)",
                        },
                        children: "Open Source",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          padding: "6px 16px",
                          borderRadius: 20,
                          border: `1px solid rgba(156, 163, 175, 0.2)`,
                          backgroundColor: "rgba(156, 163, 175, 0.05)",
                        },
                        children: "Local-First",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          padding: "6px 16px",
                          borderRadius: 20,
                          border: `1px solid rgba(156, 163, 175, 0.2)`,
                          backgroundColor: "rgba(156, 163, 175, 0.05)",
                        },
                        children: "AI-Native",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        // Bottom bar: URL
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 80px 40px",
              fontFamily: "JetBrains Mono",
              fontSize: 16,
              color: CYAN,
            },
            children: "openvolo.com",
          },
        },
      ],
    },
  },
  {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Plus Jakarta Sans", data: plusJakartaBold, weight: 700 },
      { name: "Inter", data: interRegular, weight: 400 },
      { name: "JetBrains Mono", data: jetbrainsMono, weight: 400 },
    ],
  }
);

const outputPath = join(__dirname, "..", "public", "assets", "og-image.png");

await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(outputPath);

console.log(`✓ OG image generated: ${outputPath} (${WIDTH}×${HEIGHT})`);
