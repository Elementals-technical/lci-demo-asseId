import { FlatForm, Player } from "@threekit-tools/treble/dist";
import s from "./ConfiguratorPage.module.scss";
import { ProductSettings } from "../../components/ProductSettings/ProductSettings";

export const ConfiguratorPage = () => {
  return (
    <div className={s.configuratorPage}>
      <div className={s.playerContent}>
        <Player />
      </div>
      <div className={s.productSettingsContent}>
        <ProductSettings />
        {/* <FlatForm /> */}
      </div>
    </div>
  );
};
