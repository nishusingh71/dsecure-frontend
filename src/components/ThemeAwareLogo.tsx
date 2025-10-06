import { useEffect, useState, memo } from "react";
import OptimizedImage from "./OptimizedImage";

interface ThemeAwareLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

const ThemeAwareLogo = memo(
  ({
    className,
    width,
    height,
    priority = false,
    size = "md",
    responsive = true,
  }: ThemeAwareLogoProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      // Check initial theme
      const checkTheme = () => {
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDarkMode(isDark);
      };

      // Check on mount
      checkTheme();

      // Listen for theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const logoSrc = "/logo-dark.svg";
    const altText = "DSecure - Advanced Data Security Solutions";

    // Responsive size mappings
    const sizeClasses = {
      xs: "h-6 w-auto",
      sm: "h-8 w-auto",
      md: "h-10 w-auto",
      lg: "h-12 w-auto",
      xl: "h-16 w-auto",
    };

    // Responsive width/height mappings
    const sizeDimensions = {
      xs: { width: 80, height: 24 },
      sm: { width: 120, height: 32 },
      md: { width: 150, height: 40 },
      lg: { width: 180, height: 48 },
      xl: { width: 240, height: 64 },
    };

    // Use provided className or generate responsive one
    const logoClassName =
      className ||
      (responsive
        ? `${sizeClasses[size]} sm:${
            sizeClasses[size === "xs" ? "sm" : size]
          } md:${
            sizeClasses[size === "xl" ? "xl" : size === "lg" ? "xl" : "lg"]
          } transition-all duration-200`
        : sizeClasses[size]);

    // Use provided dimensions or size-based ones
    const logoWidth = width || sizeDimensions[size].width;
    const logoHeight = height || sizeDimensions[size].height;

    return (
      <OptimizedImage
        src={logoSrc}
        alt={altText}
        className={logoClassName}
        width={logoWidth}
        height={logoHeight}
        priority={priority}
      />
    );
  }
);

ThemeAwareLogo.displayName = "ThemeAwareLogo";

export default ThemeAwareLogo;
