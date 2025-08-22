import { Btn3DIcon } from "../../../assets/img/svg/Btn3DIcon";
import Button from "../../Button/Button";
import s from "./PlayerWidgetBottomLeft.module.scss";

export const PlayerWidgetBottomLeft = () => {
  const handleChangeView = () => {
    console.log("handleChangeView --- ==== ", handleChangeView);
  };
  return (
    <div className={s.playerWidgetBottomLeft}>
      <Button className={`${s.btn} ${s.btn3d}`} iconBefore={<Btn3DIcon />} onClick={handleChangeView} />
    </div>
  );
};
