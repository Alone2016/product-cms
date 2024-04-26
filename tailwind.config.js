/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      main: ['"Inter"'],
    },
    leadingSnug: {
      snug: 1.3,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1680px",
    },
    extend: {
      container: theme => ({
        center: true,
        padding: {
          DEFAULT: "16px",
          sm: "24px",
          md: "32px",
          lg: "40px",
          xl: "40px",
          '2xl': "40px",
        },
      }),
      spacing: {
        "4.5": "18px",
        "9.5": "38px",
        11: "44px",
        11.5: "46px",
        13: "52px",
        17: "68px",
        18.5: "74px",
        21: "84px",
        22: "88px",
      },
      colors: {
        alias: { 100: "#27272A" },
        negative: {
          500: "#E84E49",
          800: "#424242",
        },
        independence: {
          600: "#7392A9",
          700: "#415872",
        },
        persia: {
          100: "#EFF4F7",
          200: "#DBEEFF",
          300: "#D7D1F4",
          400: "#EEEAFF",
          800: "#3E28A0",
        },
        persian: {
          100: "#F8F8FF",
          600: "#7D7AD4",
          700: "#514EC5",
          200: "#E9E9F8",
          400: "#BEBDE9",
          900: "#1E1B92",
        },
        lucian: {
          100: "#F1EFFE",
          200: "#DDD8F7",
          800: "#1F0A93",
          900: "#17086E",
          700: "#270DB8",
          1000: "#10054A",
        },
        global: {
          100: "#F0F8FF",
          700: "#0B74E5",
          800: "#0D5BB5",
        },
        main: {
          100: "#FFF4E4",
          200: "#FFD699",
          300: "#F2E7C4",
          400: "#FEAB41",
          500: "#FE9200",
          600: "#ED6203",
          700: "#DA6210",
        },
        secondary: {
          100: "#F5F1FD",
          200: "#DDD8F7",
          500: "#7867D4",
          700: "#270DB8",
          1000: "#371585",
        },
        yellow: {
          1000: "#2F2A0C",
          700: "#E59900",
          800: "#CC8100",
        },
        blue: {
          100: "#006DD3",
          200: "#0068E4",
          400: "#85FFE0",
          300: "#4927BC",
          500: "#2F2E6C",
          600: "#101522",
          700: "#291D8C",
          800: "#45AFFA",
          900: "#3F1EAB",
          1000: "#4F3AC6",
        },
        black: {
          DEFAULT: "#000000",
          600: "#020202",
          transparent90: "#000000E6"
        },
        gray: {
          100: "#f8f9fa",
          200: "#F6F6FA",
          300: "#EBEBF0",
          400: "#DDDDE3",
          500: "#6A6868",
          600: "#474747",
          700: "#696969",
        },
        green: {
          100: "#EFFFF4",
          200: "#003402",
          300: "#B7EFC3",
          400: "#D7FAE0",
          500: "#00AA45",
          600: "#00AB56",
          900: "#04592C",
          800: "#079449",
          1000: "#38383D",
        },
        orange: {
          100: "#ED6203",
          200: "#FFF8F2",
          300: "#F7D4B4",
          400: "#FFF8F2",
          500: "#FFFCED",
          800: "#8E3B02",
          900: "#5F2701",
          1000: "#2F1401",
        },
        red: {
          10: "#FFF0F1",
          20: "#FFDBDE",
          30: "#FFB8BC",
          50: "#FBE6E6",
          60: "#FF424E",
          500: "#D80027",
          700: "#D93843",
          900: "#910F17",
        },
        neutral: {
          100: "#FAFAFC",
          200: "#F6F6FA",
          300: "#EBEBF0",
          400: "#3C3D44",
          500: "#C4C4CF",
          600: "#A6A6B0",
          700: "#808089",
          800: "#64646D",
          900: "#515158",
          1000: "#38383D",
        },
        purple: {
          300: "#D3ADF7",
        }
      },
      fontSize: {
        "2.5xl": "28px"
      },
      lineHeight: {
        "4.5": "16px",
        "10.5": "42px",
      },
      boxShadow: {
        recommendSupplier: "0px 8px 16px -6px rgba(24, 39, 75, 0.08), 0px 6px 8px -6px rgba(24, 39, 75, 0.12)",
        supplier: "0px 10px 32px -4px rgba(24, 39, 75, 0.10), 0px 6px 14px -6px rgba(24, 39, 75, 0.12)",
        category: "0px 8px 8px -4px rgba(24, 39, 75, 0.04), 0px 4px 6px -4px rgba(24, 39, 75, 0.04)",
      },
      boxShadowColor: "0px 8px 8px rgba(0, 0, 0, 0.06)",
      backgroundImage: {
        suppliers: "linear-gradient(0deg, rgba(26, 86, 219, 0.40) 0%, rgba(26, 86, 219, 0.40) 100%), linear-gradient(270deg, #000 1.23%, rgba(0, 0, 0, 0.00) 84.26%), url(/assets/images/new-layout/bg-supplier.jpg)",
        sourcingServiceCard: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)",
        sourcingServiceButton: "linear-gradient(95deg, #FC4A1A 7.19%, rgba(247, 183, 51, 0.50) 89.49%)",
        sourcingEcommerceService: "linear-gradient(0deg, rgba(0, 71, 255, 0.30) 0%, rgba(0, 71, 255, 0.30) 100%), url('/assets/images/new-layout-detail/bg-service.png')",
        sourcingService: "linear-gradient(0deg, rgba(0, 71, 255, 0.30) 0%, rgba(0, 71, 255, 0.30) 100%), url('/assets/images/new-layout/sourcing-service-4.jpeg')",
        sourcingServiceBusiness: "url('/assets/images/new-layout/sourcing-service-4-business.png')",
        bannerProducts: "linear-gradient(90deg, #ED6203 23.88%, rgba(239, 239, 239, 0.00) 133.22%), linear-gradient(90deg, #ED6203 0%, rgba(239, 239, 239, 0.00) 100%)",
        recommendItem: "linear-gradient(0deg, #FF8A00 21.74%, rgba(255, 144, 23, 0.00) 100%)",
      },
      borderWidth: {
        1: "1px"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen xl': {
            maxWidth: '1536px',
          },
        }
      })
    },
  ],
};
