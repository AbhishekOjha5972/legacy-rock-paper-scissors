import React, { useContext, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { SocketContext } from "../../context/Socket.Context";
import vs from "../../assets/Images/new_vs.jpg";
import left_image_waiting_to_opponent from "../../assets/Images/waiting.jpg";
import right_image from "../../assets/Images/right_image.jpg";
import paper_left_hand from "../../assets/Images/paper_left_hand.png";
import paper_right_hand from "../../assets/Images/paper_right_hand.png";
import rock_left_hand from "../../assets/Images/rock_left_hand.png";
import rock_right_hand from "../../assets/Images/rock_right_hand.png";
import scissors_right_hand from "../../assets/Images/scissors_right_hand.png";
import scissors_left_hand from "../../assets/Images/scissors_left_hand.png";
import left_image_ready from "../../assets/Images/left_image_ready.jpg";
import name_show_bg from "../../assets/Images/btn_background.png"
import {Button} from "@chakra-ui/react"

const Game = () => {
  const { playerOne, playerTwo, currentRoom, handleUpdateRoom,localSocket }: any =
    useContext(SocketContext);
  const [leftImage, setLeftImage] = useState<string>(
    left_image_waiting_to_opponent
  );
  const [rightImage, setRightImage] = useState<string>(right_image);
  const [isDisable,setIsDisable] = useState<boolean>(true)

  useEffect(() => {
    if (currentRoom?.vacant == false) {
      setLeftImage(left_image_ready);
      setRightImage(right_image);
    }
    if (currentRoom) {
      let pl1 = Object.keys(currentRoom.players)[0];
      let pl2 = Object.keys(currentRoom.players)[1];
      console.log("pl1:", pl1);
      console.log("pl2:", pl2);
      setIsDisable(currentRoom.players[localSocket.id].chance)

      if (pl1 && pl2) {
        if (
          currentRoom?.players[pl1].lives == currentRoom?.players[pl2].lives
        ) {
          // if (currentRoom?.players[pl1] == pl1) {
            if (currentRoom?.players[pl1].choosen == "rock") {
              setLeftImage(rock_left_hand);
            } 
             if (currentRoom?.players[pl1].choosen == "paper") {
              setLeftImage(paper_left_hand);
            } 
             if (currentRoom?.players[pl1].choosen == "scissors"){
              setLeftImage(scissors_left_hand);
            }
             if(currentRoom?.players[pl2].choosen == "rock") {
              setRightImage(rock_right_hand);
            }
             if (currentRoom?.players[pl2].choosen == "paper") {
              setRightImage(paper_right_hand);
            } 
             if(currentRoom?.players[pl2].choosen == "scissors"){
              setRightImage(scissors_right_hand);
            }
        }
      }


    }
  }, [currentRoom, leftImage, rightImage]);

  return (
    <div className={styles.game_main_container}>
      <div
        className={styles.game_container}
        style={{ background: `url(${vs})` }}
      >
        <div className={styles.game_leftChild}>
          <img src={leftImage} />
          <div style={{background:`url(${name_show_bg})`}}>
            <span>{playerOne?.user_name}</span>
          </div>
          <p>
          <span>MOVES: {playerOne?.lives}</span>
          <span>SCORE: {playerOne?.score}</span>
          </p>
        </div>
        <div className={styles.game_rightChild}>
          <img
            src={
              currentRoom?.vacant == true
                ? "https://www.futureofwork.gov.sg/images/loading.gif"
                : rightImage
            }
          />
          <div style={{background:`url(${name_show_bg})`}}>
          <span>{playerTwo?.user_name}</span>
          </div>
          <p>
          <span>MOVES: {playerTwo?.lives}</span>
          <span>SCORE: {playerTwo?.score}</span>
          </p>
        </div>
      </div>
      <div className={styles.buttonDiv}>
        <Button
          onClick={() => {
            handleUpdateRoom("rock");
          }}
          isDisabled={!isDisable}
        >
          ROCK
        </Button>

        <Button
          onClick={() => {
            handleUpdateRoom("paper");
          }}
          isDisabled={!isDisable}
        >
          PAPER
        </Button>

        <Button
          onClick={() => {
            handleUpdateRoom("scissors");
          }}
          isDisabled={!isDisable}
        >
          SCISSORS
        </Button>
      </div>
    </div>
  );
};

export default Game;
