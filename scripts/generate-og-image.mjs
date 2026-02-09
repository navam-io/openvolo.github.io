import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Fonts ─────────────────────────────────────────────────
const plusJakartaBold = readFileSync(
  join(__dirname, "fonts", "PlusJakartaSans-Bold.ttf")
);
const interRegular = readFileSync(
  join(__dirname, "fonts", "Inter-Regular.ttf")
);
const jetbrainsMono = readFileSync(
  join(__dirname, "fonts", "JetBrainsMono-Regular.ttf")
);

// ── Logo ──────────────────────────────────────────────────
const logoBuffer = readFileSync(
  join(__dirname, "..", "public", "assets", "openvolo-logo-transparent.png")
);
const logoDataUri = `data:image/png;base64,${logoBuffer.toString("base64")}`;

// ── Dimensions ────────────────────────────────────────────
const WIDTH = 1200;
const HEIGHT = 630;

// ── Brand Colors ──────────────────────────────────────────
const BG = "#1a1625";
const CYAN = "#0891b2";
const LAVENDER = "#a78bfa";
const PINK = "#ec4899";
const CORAL = "#f97316";
const MUTED = "#9ca3af";
const WHITE = "#ffffff";
const TEXT_LIGHT = "#f0eef6";
const TEXT_DIM = "#d4d0e0";

// ── Content ───────────────────────────────────────────────
const PILLS = ["Open Source", "Local-First", "AI-Native", "Zero Install", "Encrypted"];
const PILL_COLORS = [CYAN, LAVENDER, PINK, CORAL, CYAN];

const FEATURES = [
  { key: "contacts", label: "Contacts" },
  { key: "workflows", label: "Workflows" },
  { key: "ai-agents", label: "AI Agents" },
  { key: "analytics", label: "Analytics" },
  { key: "chat", label: "Chat" },
];

const FEATURE_DESCRIPTIONS = [
  "Manage contacts",
  "Automate tasks",
  "Run AI tools",
  "Track metrics",
  "Ask anything",
];

// ── Icon SVG children (extracted from Features.astro) ─────
// Each icon returns an array of SVG child elements for Satori.
// viewBox is 0 0 24 24, stroke-based icons.
function iconChildren(key, color) {
  const stroke = color || WHITE;
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (key) {
    case "contacts": // users icon
      return [
        { type: "path", props: { ...common, d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" } },
        { type: "circle", props: { ...common, cx: 9, cy: 7, r: 4 } },
        { type: "path", props: { ...common, d: "M22 21v-2a4 4 0 0 0-3-3.87" } },
        { type: "path", props: { ...common, d: "M16 3.13a4 4 0 0 1 0 7.75" } },
      ];
    case "workflows": // workflow icon
      return [
        { type: "circle", props: { ...common, cx: 18, cy: 18, r: 3 } },
        { type: "circle", props: { ...common, cx: 6, cy: 6, r: 3 } },
        { type: "path", props: { ...common, d: "M6 21V9a9 9 0 0 0 9 9" } },
      ];
    case "ai-agents": // bot icon
      return [
        { type: "path", props: { ...common, d: "M12 8V4H8" } },
        { type: "rect", props: { ...common, width: 16, height: 12, x: 4, y: 8, rx: 2 } },
        { type: "path", props: { ...common, d: "M2 14h2" } },
        { type: "path", props: { ...common, d: "M20 14h2" } },
        { type: "path", props: { ...common, d: "M15 13v2" } },
        { type: "path", props: { ...common, d: "M9 13v2" } },
      ];
    case "analytics": // chart icon
      return [
        { type: "path", props: { ...common, d: "M3 3v16a2 2 0 0 0 2 2h16" } },
        { type: "path", props: { ...common, d: "m19 9-5 5-4-4-3 3" } },
      ];
    case "chat": // chat bubble icon
      return [
        { type: "path", props: { ...common, d: "M7.9 20A9 9 0 1 0 4 16.1L2 22z" } },
      ];
    default:
      return [];
  }
}

// ── Shared Helpers ────────────────────────────────────────

function createSvgIcon(key, size, color) {
  return {
    type: "svg",
    props: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: iconChildren(key, color),
    },
  };
}

function createGlowOrb(x, y, size, color, opacity) {
  return {
    type: "div",
    props: {
      style: {
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
      },
    },
  };
}

function createGradientBar(position, height) {
  const style = {
    position: "absolute",
    left: 0,
    right: 0,
    height,
    background: `linear-gradient(to right, ${CYAN}, ${LAVENDER}, ${PINK}, ${CORAL})`,
  };
  if (position === "top") style.top = 0;
  else style.bottom = 0;
  return { type: "div", props: { style } };
}

function createLogo(size, centered) {
  const style = { borderRadius: Math.round(size * 0.2) };
  if (centered) {
    // no extra needed
  }
  return {
    type: "img",
    props: { src: logoDataUri, width: size, height: size, style },
  };
}

function createTitle(text, fontSize, color) {
  return {
    type: "div",
    props: {
      style: {
        fontSize,
        fontWeight: 700,
        color: color || TEXT_LIGHT,
        fontFamily: "Plus Jakarta Sans",
        lineHeight: 1.1,
      },
      children: text,
    },
  };
}

function createTagline(text, fontSize, color) {
  return {
    type: "div",
    props: {
      style: {
        fontSize,
        fontWeight: 600,
        color: color || TEXT_DIM,
        fontFamily: "Plus Jakarta Sans",
        lineHeight: 1.3,
      },
      children: text,
    },
  };
}

function createDomain(fontSize, color, align) {
  return {
    type: "div",
    props: {
      style: {
        fontSize,
        color: color || "rgba(255,255,255,0.6)",
        fontFamily: "JetBrains Mono",
        textAlign: align || "center",
        letterSpacing: 1,
      },
      children: "openvolo.com",
    },
  };
}

// ── Satori config ─────────────────────────────────────────
const satoriConfig = {
  width: WIDTH,
  height: HEIGHT,
  fonts: [
    { name: "Plus Jakarta Sans", data: plusJakartaBold, weight: 700 },
    { name: "Inter", data: interRegular, weight: 400 },
    { name: "JetBrains Mono", data: jetbrainsMono, weight: 400 },
  ],
};

// ══════════════════════════════════════════════════════════
// VARIATION A — "Gradient Horizon"
// Full-bleed brand gradient with centered vertical stack
// ══════════════════════════════════════════════════════════

function buildVariantA() {
  // 2x scale for retina-quality output
  const S = 2;
  const W = WIDTH * S;
  const H = HEIGHT * S;

  // Pills — white frosted glass
  const pills = {
    type: "div",
    props: {
      style: {
        display: "flex",
        gap: 20 * S / 2,
        justifyContent: "center",
        fontFamily: "Inter",
        fontSize: 14 * S,
        color: WHITE,
      },
      children: PILLS.map((label) => ({
        type: "div",
        props: {
          style: {
            padding: `${14 * S / 2}px ${18 * S}px`,
            borderRadius: 20 * S,
            backgroundColor: "rgba(255,255,255,0.15)",
            border: `${S}px solid rgba(255,255,255,0.25)`,
          },
          children: label,
        },
      })),
    },
  };

  // Feature icons row
  const featureRow = {
    type: "div",
    props: {
      style: {
        display: "flex",
        gap: 48 * S,
        justifyContent: "center",
        alignItems: "center",
      },
      children: FEATURES.map((f) => ({
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8 * S,
          },
          children: [
            createSvgIcon(f.key, 30 * S, WHITE),
            {
              type: "div",
              props: {
                style: {
                  fontSize: 13 * S,
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "Inter",
                },
                children: f.label,
              },
            },
          ],
        },
      })),
    },
  };

  return {
    type: "div",
    props: {
      style: {
        width: W,
        height: H,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${CYAN} 0%, ${LAVENDER} 35%, ${PINK} 65%, ${CORAL} 100%)`,
      },
      children: [
        // Dark vignette overlay at bottom
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: H,
              background: "linear-gradient(to bottom, transparent 0%, rgba(26,22,37,0.7) 100%)",
            },
          },
        },
        // White orb top-right for texture
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              right: -160,
              top: -160,
              width: 800,
              height: 800,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            },
          },
        },
        // Content stack
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "center",
              gap: 0,
              paddingTop: 40,
            },
            children: [
              // Logo
              {
                type: "div",
                props: {
                  style: { display: "flex", marginBottom: 32 },
                  children: createLogo(160, true),
                },
              },
              // Title
              {
                type: "div",
                props: {
                  style: { display: "flex", marginBottom: 24 },
                  children: createTitle("OpenVolo", 144, WHITE),
                },
              },
              // Tagline
              {
                type: "div",
                props: {
                  style: { display: "flex", marginBottom: 64 },
                  children: createTagline("Your AI-Powered Social CRM", 60, "rgba(255,255,255,0.9)"),
                },
              },
              // Pills
              {
                type: "div",
                props: {
                  style: { display: "flex", marginBottom: 80 },
                  children: pills,
                },
              },
              // Feature icons
              featureRow,
            ],
          },
        },
        // Domain at bottom
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: 40,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            },
            children: createDomain(30, "rgba(255,255,255,0.5)", "center"),
          },
        },
        // Bottom gradient bar (reversed)
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 12,
              background: `linear-gradient(to right, ${CORAL}, ${PINK}, ${LAVENDER}, ${CYAN})`,
            },
          },
        },
      ],
    },
  };
}

// ══════════════════════════════════════════════════════════
// VARIATION B — "Card Stack"
// Floating glass card over dark background with glow orbs
// ══════════════════════════════════════════════════════════

function buildVariantB() {
  // Color-coded pills
  const pills = {
    type: "div",
    props: {
      style: {
        display: "flex",
        gap: 10,
        fontFamily: "Inter",
        fontSize: 13,
        color: TEXT_LIGHT,
        flexWrap: "wrap",
      },
      children: PILLS.map((label, i) => ({
        type: "div",
        props: {
          style: {
            display: "flex",
            alignItems: "center",
            padding: "6px 14px",
            borderRadius: 8,
            backgroundColor: `${PILL_COLORS[i]}11`,
            borderLeft: `3px solid ${PILL_COLORS[i]}`,
          },
          children: label,
        },
      })),
    },
  };

  // Feature tiles
  const featureTiles = {
    type: "div",
    props: {
      style: {
        display: "flex",
        gap: 14,
        alignItems: "center",
      },
      children: FEATURES.map((f, i) => ({
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 16,
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            gap: 6,
          },
          children: [
            createSvgIcon(f.key, 26, PILL_COLORS[i]),
            {
              type: "div",
              props: {
                style: {
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "Inter",
                },
                children: f.label,
              },
            },
          ],
        },
      })),
    },
  };

  return {
    type: "div",
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BG,
        position: "relative",
        overflow: "hidden",
      },
      children: [
        // Top gradient bar
        createGradientBar("top", 4),
        // Ambient glow orbs
        createGlowOrb(100, 80, 350, CYAN, 0.12),
        createGlowOrb(1100, 100, 300, LAVENDER, 0.1),
        createGlowOrb(1000, 550, 350, PINK, 0.08),
        // Floating card
        {
          type: "div",
          props: {
            style: {
              width: 1040,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(30,25,45,0.8)",
              border: "1px solid rgba(167,139,250,0.2)",
              borderRadius: 24,
              padding: "40px 48px",
              gap: 28,
            },
            children: [
              // Top row: logo + name + tagline
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                  },
                  children: [
                    createLogo(64, false),
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        },
                        children: [
                          createTitle("OpenVolo", 48, TEXT_LIGHT),
                          createTagline("Your AI-Powered Social CRM", 20, TEXT_DIM),
                        ],
                      },
                    },
                  ],
                },
              },
              // Pills row
              pills,
              // Bottom: feature tiles + domain
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                  children: [
                    featureTiles,
                    createDomain(14, "rgba(255,255,255,0.4)", "right"),
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ══════════════════════════════════════════════════════════
// VARIATION C — "Split Panel"
// Asymmetric two-panel layout: gradient left, dark right
// ══════════════════════════════════════════════════════════

function buildVariantC() {
  const LEFT_W = 440;
  const RIGHT_W = WIDTH - LEFT_W;

  // Left panel
  const leftPanel = {
    type: "div",
    props: {
      style: {
        width: LEFT_W,
        height: HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 44px",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${CYAN} 0%, ${LAVENDER} 50%, ${PINK} 100%)`,
      },
      children: [
        // White orb texture
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              right: -60,
              top: -40,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
            },
          },
        },
        // Top content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 20,
            },
            children: [
              createLogo(80, false),
              createTitle("OpenVolo", 56, WHITE),
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  },
                  children: [
                    createTagline("Your AI-Powered", 28, "rgba(255,255,255,0.9)"),
                    createTagline("Social CRM", 28, "rgba(255,255,255,0.9)"),
                  ],
                },
              },
            ],
          },
        },
        // Bottom domain
        {
          type: "div",
          props: {
            style: { display: "flex" },
            children: createDomain(14, "rgba(255,255,255,0.5)", "left"),
          },
        },
      ],
    },
  };

  // Right panel pills
  const pillsRow = {
    type: "div",
    props: {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        fontFamily: "Inter",
        fontSize: 13,
        color: "rgba(255,255,255,0.7)",
      },
      children: PILLS.map((label) => ({
        type: "div",
        props: {
          style: {
            padding: "5px 14px",
            borderRadius: 16,
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          },
          children: label,
        },
      })),
    },
  };

  // Feature row cards
  const featureRows = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
      },
      children: FEATURES.map((f, i) => ({
        type: "div",
        props: {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 14,
          },
          children: [
            // Colored icon container
            {
              type: "div",
              props: {
                style: {
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  backgroundColor: `${PILL_COLORS[i]}18`,
                  border: `1px solid ${PILL_COLORS[i]}30`,
                  flexShrink: 0,
                },
                children: createSvgIcon(f.key, 22, PILL_COLORS[i]),
              },
            },
            // Name + description
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: {
                        fontSize: 15,
                        fontWeight: 700,
                        color: TEXT_LIGHT,
                        fontFamily: "Plus Jakarta Sans",
                      },
                      children: f.label,
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        fontSize: 13,
                        color: MUTED,
                        fontFamily: "Inter",
                      },
                      children: FEATURE_DESCRIPTIONS[i],
                    },
                  },
                ],
              },
            },
          ],
        },
      })),
    },
  };

  // Right panel
  const rightPanel = {
    type: "div",
    props: {
      style: {
        width: RIGHT_W,
        height: HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 48px 20px",
        backgroundColor: BG,
        position: "relative",
        overflow: "hidden",
      },
      children: [
        // Subtle lavender orb
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              right: -40,
              top: -40,
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${LAVENDER} 0%, transparent 70%)`,
              opacity: 0.06,
            },
          },
        },
        // Content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 24,
            },
            children: [pillsRow, featureRows],
          },
        },
        // Bottom accent bar
        {
          type: "div",
          props: {
            style: {
              height: 3,
              borderRadius: 2,
              background: `linear-gradient(to right, ${CYAN}, ${LAVENDER}, ${PINK}, ${CORAL})`,
            },
          },
        },
      ],
    },
  };

  return {
    type: "div",
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        position: "relative",
        overflow: "hidden",
      },
      children: [leftPanel, rightPanel],
    },
  };
}

// ══════════════════════════════════════════════════════════
// CLI & Generation
// ══════════════════════════════════════════════════════════

const variants = {
  a: { build: buildVariantA, name: "Gradient Horizon", width: WIDTH * 2, height: HEIGHT * 2 },
  b: { build: buildVariantB, name: "Card Stack", width: WIDTH, height: HEIGHT },
  c: { build: buildVariantC, name: "Split Panel", width: WIDTH, height: HEIGHT },
};

const arg = (process.argv[2] || "all").toLowerCase();
const keys = arg === "all" ? Object.keys(variants) : [arg];

for (const key of keys) {
  const variant = variants[key];
  if (!variant) {
    console.error(`Unknown variant: ${key}. Use a, b, c, or all.`);
    process.exit(1);
  }

  const tree = variant.build();
  const config = { ...satoriConfig, width: variant.width, height: variant.height };
  const svg = await satori(tree, config);
  const outputPath = join(__dirname, "..", "public", "assets", `og-image-${key}.png`);
  await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(outputPath);

  const stats = readFileSync(outputPath);
  const sizeKB = (stats.length / 1024).toFixed(1);
  console.log(`✓ Variant ${key.toUpperCase()} "${variant.name}" → ${outputPath} (${variant.width}×${variant.height}, ${sizeKB} KB)`);
}
