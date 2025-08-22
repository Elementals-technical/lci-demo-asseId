import React, { useEffect, useRef } from "react";

export type ThreekitIframePlayerProps = {
  style?: React.CSSProperties;
  className?: string;
  assetId: string;
};

export function ThreekitIframePlayer({ assetId, style, className }: any) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    //@ts-ignore
    window.iframePlayer = iframeRef;
  }, []);

  return (
    <iframe
      id="tk-iframe-player"
      ref={iframeRef}
      title="threekit-iframe-player"
      src={window.location.origin + `/iframe?assetId=${assetId}`}
      style={{ width: "100%", height: "100%", border: 0, background: "#fff", ...style }}
      className={className}
      allow="fullscreen; autoplay; xr-spatial-tracking; camera; microphone"
    />
  );
}

export default ThreekitIframePlayer;
