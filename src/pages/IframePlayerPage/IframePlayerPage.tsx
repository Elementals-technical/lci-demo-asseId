import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import s from "./IframePlayerPage.module.scss";
import { PlayerWidgets } from "../../components/PlayerWidgets/PlayerWidgets";
import { load3kit } from "../../utils/threekit/threekitUtils";
import { THREEKIT_PUBLIC_TOKEN } from "../../config/threekit/threekitConfig";
import { store } from "../../store/store";
import { changeProcessing } from "../../store/slices/configurator/Configurator.sclice";

declare global {
  interface Window {
    //@ts-ignore
    threekitPlayer?: (opts: Record<string, any>) => Promise<any>;
    player?: any;
  }
}

const IframePlayerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const assetId = searchParams.get("assetId") ?? ""; // пустая строка, если нет параметра

  const [loadedScript, setLoadedScript] = useState(false);
  const [initializing, setInitializing] = useState(false);

  const playerEl = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<any>(null);
  const lastAssetIdRef = useRef<string>("");

  // Грузим скрипт Threekit один раз
  useEffect(() => {
    load3kit(null, () => setLoadedScript(true));
    store.dispatch(changeProcessing({ isProcessing: true }));
  }, []);

  // Переинициализация при изменении assetId (и когда скрипт загружен)
  useEffect(() => {
    console.log("111111 --- ==== ");
    if (!loadedScript) return;
    if (!assetId) return;
    if (!window.threekitPlayer) return;
    if (!playerEl.current) return;
    console.log("dddddddd --- ==== ");

    // если уже инициализирован на этот же asset — ничего не делаем
    if (lastAssetIdRef.current === assetId) return;

    let cancelled = false;

    const init = async () => {
      try {
        setInitializing(true);

        // убрать предыдущий инстанс (если был)
        apiRef.current = null;
        // очистить DOM контейнер, чтобы избежать двойной инициализации в одном el
        playerEl.current!.replaceChildren();

        const api = await window.threekitPlayer!({
          authToken: THREEKIT_PUBLIC_TOKEN() || "",
          el: playerEl.current as HTMLElement,
          assetId,
          showShare: true,
          showLoadingThumbnail: false,
          publishStage: "draft",
          // showConfigurator: true, // если нужно
        });

        if (cancelled) return;

        apiRef.current = api;
        window.player = api;
        lastAssetIdRef.current = assetId;
        // console.log("Threekit initialized for", assetId);
      } catch (e) {
        console.error("Threekit init failed", e);
      } finally {
        if (!cancelled) setInitializing(false);
      }
    };

    init();

    // если за время инициализации компонент размонтировался/assetId сменился — отменяем
    return () => {
      cancelled = true;
    };
  }, [loadedScript, assetId]);

  return (
    <div className={s.wrap}>
      <div id="player" className={s.player} ref={playerEl}></div>

      {/* Можно показать индикатор во время переинициализации */}
      {initializing && <div className={s.loadingOverlay}>Loading...</div>}
    </div>
  );
};

export default IframePlayerPage;
