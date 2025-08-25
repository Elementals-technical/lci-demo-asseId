import { useAttribute } from "@threekit-tools/treble/dist";
import { BtnARIcon } from "../../../assets/img/svg/BtnARIcon";
import { BtnDimentionsIcon } from "../../../assets/img/svg/BtnDimentionsIcon";
import { BtnExplodeIcon } from "../../../assets/img/svg/BtnExplodeIcon";
import { BtnFullScreenIcon } from "../../../assets/img/svg/BtnFullScreenIcon";
import { getConfiguratorView } from "../../../store/slices/configurator/selectors/selectors";
import { useAppSelector } from "../../../store/store";
import Button from "../../Button/Button";
import s from "./PlayerWidgetBottomRight.module.scss";
import { ATTRIBUTE_TYPES } from "@threekit-tools/treble/dist/types";

export const PlayerWidgetBottomRight = () => {
  const configuratorView = useAppSelector(getConfiguratorView);
  const [attrExplode, setAttrExplode] = useAttribute("explode");
  const [attrDimensions, setAttrDimensions] = useAttribute("OnDimensions");

  const handleExplode = () => {
    if (attrExplode && attrExplode.type === ATTRIBUTE_TYPES.BOOLEAN) {
      setAttrExplode(!attrExplode.value);
    }
  };

  const handleDimentions = () => {
    if (attrDimensions && attrDimensions.type === ATTRIBUTE_TYPES.BOOLEAN) {
      setAttrDimensions(!attrDimensions.value);
    }
  };

  const handleAR = () => {
    const element = document.querySelector('[data-id="arButton"]') as HTMLElement | null;
    if (element) {
      element.click();
    }
  };

  const handleFullScreen = () => {
    const element = document.querySelector('[data-id="BTN_player_full_screen"]') as HTMLElement | null;
    if (element) {
      element.click();
    }
  };

  return (
    <div className={s.playerWidgetBottomRight}>
      {configuratorView === "3D" && (
        <>
          {attrExplode && (
            <Button
              className={`${s.btn} ${attrExplode && attrExplode.type === ATTRIBUTE_TYPES.BOOLEAN && attrExplode.value ? s.active : ""}`}
              iconBefore={<BtnExplodeIcon />}
              onClick={handleExplode}
            />
          )}
          {attrDimensions && (
            <Button
              className={`${s.btn} ${attrDimensions && attrDimensions.type === ATTRIBUTE_TYPES.BOOLEAN && attrDimensions.value ? s.active : ""}`}
              iconBefore={<BtnDimentionsIcon />}
              onClick={handleDimentions}
            />
          )}

          <Button className={s.btn} iconBefore={<BtnARIcon />} onClick={handleAR} />
        </>
      )}
      <Button className={s.btn} iconBefore={<BtnFullScreenIcon />} onClick={handleFullScreen} />
    </div>
  );
};
