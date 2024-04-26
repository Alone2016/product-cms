import { MantineThemeOverride } from "@mantine/core";
import { createTheme } from "styled-breakpoints";

const theme = createTheme({
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
});

export { theme };

export const configTheme: MantineThemeOverride = {
  components: {
    Button: { defaultProps: { size: "lg" }, classNames: { root: "text-base leading-none", leftIcon: "mr-1" } },
    Input: {
      defaultProps: { size: "lg" },
      classNames: { label: "text-sm w-full", input: "text-sm p-3", error: "text-xs" },
    },
    TextInput: {
      defaultProps: { size: "lg" },
      classNames: { label: "text-sm w-full", input: "text-sm p-3", error: "text-xs" },
    },
    PasswordInput: {
      defaultProps: { size: "lg" },
      classNames: { label: "text-sm w-full", innerInput: "text-sm p-3", error: "text-xs" },
    },
    MultiSelect: {
      defaultProps: { size: "lg" },
      classNames: { label: "text-sm w-full", input: "px-3", searchInput: "text-sm", error: "text-xs" },
    },
  },
  fontFamily: "Inter",
  defaultRadius: "md",
  colors: {
    main: [
      "#fff5ef",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#ED6203", // primary
      "#d73a04", // primary:hover
      "#128797",
      "#147885",
    ],
    red: [
      "#FFF5F5",
      "#FFE3E3",
      "#FFE3E3",
      "#FFA8A8",
      "#FF8787",
      "#FF6B6B",
      "#E84E49",
      "#F03E3E",
      "#E03131",
      "#C92A2A",
    ],
  },
  primaryColor: "main",
  colorScheme: "light",
}
