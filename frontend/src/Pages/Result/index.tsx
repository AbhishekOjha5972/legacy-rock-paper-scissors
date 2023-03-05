import React, { useContext } from "react";
import { SocketContext } from "../../context/Socket.Context";
import styles from "./styles.module.css";
import result_bg from "../../assets/Images/win_background.png";
import Draw_match from "./Draw_match";
import Someone_won from "./Someone_won";

const Result_Page = () => {
  const {newResult }: any = useContext(SocketContext);
  return (
    <div
      className={styles.result_main_container}
      style={{ background: `url(${result_bg})` }}
    >
      {newResult?.tie_status ? <Draw_match /> : <Someone_won />}
    </div>
  );
};

export default Result_Page;
