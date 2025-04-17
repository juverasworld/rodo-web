import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        mds: "600px",
        md: "768px",
        lgss: "976px",
        lgs: "1050px",
        lg: "1200px",
        xxl: "1440px",
      },
      colors: {
        primary: "#D8383A",
        secondary: "#0BB68F",
        "brand-yellow": "#F79E1B",
        accent: "#D8383A",
        black: "#202532",
        text: "#476072",
        white: "#FFFFFF",
        gray: "#F5F6FB",
        gray2: "#F6F6F6",
        blue: "#008AEE",
        subtitle: "#747474",
        "topic-body": "#545465",
        "topic-title": "#202532",
        "smoky-black": "#0F0F0F",
        "navy-gray": "#2F3557",
        "faux-cadet": "#222151",
        "cadet-blue": "#A0A3BD",
        "cadet-purple": "#7333fc",
        "white-smoke": "#F0F0F0",
        "metalic-grey": "#8E8E8E",
        "grey-white": "rgba(255, 255, 255, 0.9)",
      },
      fontSize: {
        xs: ".75rem",
        sm: "15px",
        tiny: ".875rem",
        base: "1rem",
        heading: [
          "72px",
          {
            letterSpacing: "-0.05em",
            lineHeight: "116%",
          },
        ],
        headingMob: [
          "39px",
          {
            letterSpacing: "-0.075em",
            lineHeight: "92%",
          },
        ],
        // fontFamily: {
        //   helvetica: ['"Helvetica Neue"', "sans-serif"],
        // },
        lg: "1.125rem",
        xl: "1.25rem",
        "mobile-nav": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      boxShadow: {
        "3xl": "10px 10px 100px rgba(117, 129, 173, 0.4)",
        "2xl":
          "0px -10px 25px rgba(187, 187, 187, 0.25), 0px 10px 20px rgba(187, 187, 187, 0.2), 0px 5px 25px rgba(187,187, 187, 0.25)",
        feint: "10px 10px 100px rgba(117, 129, 173, 0.4)",
      },
      // borderRadius: {
      //     none: '0',
      //     sm: '0.125rem',
      //     DEFAULT: '10px',
      //     md: '0.375rem',
      //     lg: '0.5rem',
      //     full: '9999px',
      //     large: '12px',
      // },
    },
  },
  plugins: [],
};
export default config;
