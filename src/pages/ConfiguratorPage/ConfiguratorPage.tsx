import { FlatForm, Player } from "@threekit-tools/treble/dist";
import s from "./ConfiguratorPage.module.scss";
import { ProductSettings } from "../../components/ProductSettings/ProductSettings";
import { PlayerWidgetBottomLeft } from "../../components/PlayerWidgets/PlayerWidgetBottomLeft/PlayerWidgetBottomLeft";
import { PlayerWidgetBottomRight } from "../../components/PlayerWidgets/PlayerWidgetBottomRight/PlayerWidgetBottomRight";

export const ConfiguratorPage = () => {
  return (
    <div className={s.configuratorPage}>
      <div className={s.playerContent}>
        <Player />
        <PlayerWidgetBottomLeft />
        <PlayerWidgetBottomRight />
      </div>
      <div className={s.productSettingsContent}>
        <ProductSettings />
        {/* <FlatForm /> */}
      </div>
    </div>
  );
};
