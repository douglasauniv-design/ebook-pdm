import React, { useEffect, useRef } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";

type SnackEmbeddedProps = {
  snackId: string;
};

declare global {
  interface Window {
    ExpoSnack?: {
      initialize: () => void;
      append: (container: HTMLElement, options?: any) => void;
      remove: (container: HTMLElement) => void;
    };
  }
}

export default function SnackEmbedded({ snackId }: SnackEmbeddedProps) {
  const { colorMode } = useColorMode();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const initSnack = () => {
      if (window.ExpoSnack && container) {
        window.ExpoSnack.remove(container);
        window.ExpoSnack.initialize();
      }
    };

    if (window.ExpoSnack) {
      initSnack();
    } else {
      const scriptId = "expo-snack-embed-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://snack.expo.dev/embed.js";
        script.async = true;
        script.onload = initSnack;
        document.body.appendChild(script);
      } else {
        script.addEventListener("load", initSnack);
      }
    }
  }, [snackId, colorMode]);

  return (
    <>
      <a
        href={`https://snack.expo.dev/${snackId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="snack-link"
      >
        <img
          src={useBaseUrl("/img/snack.svg")}
          alt="Expo Snack"
          width="20"
          height="20"
        />
        Abrir no Expo Snack ↗️
      </a>

      <div
        ref={containerRef}
        data-snack-id={snackId}
        data-snack-platform="web"
        data-snack-preview="true"
        data-snack-files="true"
        data-snack-loading="lazy"
        data-snack-theme={colorMode}
        className="snack"
      ></div>
    </>
  );
}
