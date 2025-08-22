import { BtnARIcon } from "../../../assets/img/svg/BtnARIcon";
import { BtnDimentionsIcon } from "../../../assets/img/svg/BtnDimentionsIcon";
import { BtnExplodeIcon } from "../../../assets/img/svg/BtnExplodeIcon";
import { BtnFullScreenIcon } from "../../../assets/img/svg/BtnFullScreenIcon";
import { getConfiguratorView } from "../../../store/slices/configurator/selectors/selectors";
import { useAppSelector } from "../../../store/store";
import Button from "../../Button/Button";
import s from "./PlayerWidgetBottomRight.module.scss";

export const PlayerWidgetBottomRight = () => {
  const configuratorView = useAppSelector(getConfiguratorView);

  const handleExplode = () => {
    console.log("handleExplode --- ==== ");
  };

  const handleDimentions = () => {
    console.log("handleDimentions --- ==== ");
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
          <Button className={s.btn} iconBefore={<BtnExplodeIcon />} onClick={handleExplode} />
          <Button className={s.btn} iconBefore={<BtnDimentionsIcon />} onClick={handleDimentions} />
          <Button className={s.btn} iconBefore={<BtnARIcon />} onClick={handleAR} />
        </>
      )}
      <Button className={s.btn} iconBefore={<BtnFullScreenIcon />} onClick={handleFullScreen} />
    </div>
  );
};
