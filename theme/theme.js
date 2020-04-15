export default {
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    fonts: {
      body:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      heading: "inherit",
      monospace: "Menlo, monospace"
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700
    },
    lineHeights: {
      body: 1.5,
      heading: 1.125
    },
    colors: {
      text: "#090d1f",
      altText:'#c2c2c2',
      background: "#fcfcfc",
      primary: "#ED6A5A",
      secondary: "#8B2635",
      muted: "#e6e6e6",
      accent: "#f49342",
      highlight: "#e8582c",
      gray: "#dfe3e8",
      modes: {
        dark: {
          text: "#000a",
          altText:'#090d1f',
          background: "#2e3c54",
          primary: "#1a2d5e",
          secondary: "#306869",
          accent:'#47c1bf',
          muted: "#e6e6e6",
          gray:"rgb(111, 117, 128)"
        },
        papaya: {
          // this color mode will fallback to the root color object
          // for values not defined here
          text: "#433",
          background: "papayawhip"
        }
      }
    },
    styles: {
      root: {
        fontFamily: "body",
        lineHeight: "body",
        fontWeight: "body"
      },
      h1: {
        color: "text",
        fontFamily: "heading",
        lineHeight: "heading",
        fontWeight: "heading",
        fontSize: 5
      },
      h2: {
        color: "text",
        fontFamily: "heading",
        lineHeight: "heading",
        fontWeight: "heading",
        fontSize: 4
      },
      h3: {
        color: "text",
        fontFamily: "heading",
        lineHeight: "heading",
        fontWeight: "heading",
        fontSize: 3
      },
      h4: {
        color: "text",
        fontFamily: "heading",
        lineHeight: "heading",
        fontWeight: "heading",
        fontSize: 2
      },
      h5: {
        color: "text",
        fontFamily: "heading",
        lineHeight: "heading",
        fontWeight: "heading",
        fontSize: 1
      },
      h6: {
        color: "text",
        fontFamily: "heading",
        lineHeight: "heading",
        fontWeight: "heading",
        fontSize: 0
      },
      p: {
        color: "text",
        fontFamily: "body",
        fontWeight: "body",
        lineHeight: "body"
      },
      a: {
        color: "primary"
      },
      pre: {
        fontFamily: "monospace",
        overflowX: "auto",
        code: {
          color: "inherit"
        }
      },
      code: {
        fontFamily: "monospace",
        fontSize: "inherit"
      },
      table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: 0
      },
      th: {
        textAlign: "left",
        borderBottomStyle: "solid"
      },
      td: {
        textAlign: "left",
        borderBottomStyle: "solid"
      },
      img: {
        maxWidth: "100%"
      }
    },
    images: {
      avatar: {
        width: 64,
        height: 64,
        borderRadius: 50,
        padding: "5px"
      }
    }
  };
  