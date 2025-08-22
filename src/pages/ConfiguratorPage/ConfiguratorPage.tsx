import { Player, useThreekitInitStatus } from "@threekit-tools/treble/dist";
import s from "./ConfiguratorPage.module.scss";
import { ProductSettings } from "../../components/ProductSettings/ProductSettings";
import { PlayerWidgets } from "../../components/PlayerWidgets/PlayerWidgets";
import { useAppSelector } from "../../store/store";
import { getConfiguratorView } from "../../store/slices/configurator/selectors/selectors";
import ThreekitIframePlayer from "../../components/ThreekitIframePlayer/ThreekitIframePlayer";
import { PhotoSlider } from "../../components/PhotoSlider/PhotoSlider";
import { useEffect } from "react";

export const ConfiguratorPage = () => {
  const hasLoaded = useThreekitInitStatus();
  const configuratorView = useAppSelector(getConfiguratorView);
  return (
    <div className={s.configuratorPage}>
      <div className={s.playerContent}>
        {configuratorView === "3D" ? (
          <Player />
        ) : (
          <ThreekitIframePlayer
            className={s.player}
            assetId="12f1762e-7ade-4336-b02e-131651d66c13"
            // orgId={THREEKIT_ORG_ID() || ""}
            // publicToken={THREEKIT_PUBLIC_TOKEN() || ""}
            // host="https://preview.threekit.com"
          />
        )}
        {/* <Player /> */}
        {hasLoaded && <PhotoSlider />}
        <PlayerWidgets />
      </div>
      <div className={s.productSettingsContent}>
        <ProductSettings />
        {/* <FlatForm /> */}
      </div>
    </div>
  );
};
