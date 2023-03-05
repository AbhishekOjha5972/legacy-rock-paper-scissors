import React, { useContext } from 'react'
import { SocketContext } from '../../context/Socket.Context'
import styles from "./styles.module.css"
import left_hand_winner from "../../assets/Images/left_hand_winner.jpg"
import left_hand_looser from "../../assets/Images/left_hand_looser.jpg"
import right_hand_winner from "../../assets/Images/right_hand_winner.jpg"
import right_hand_looser from "../../assets/Images/right_hand_looser.jpg"
import draw_match from "../../assets/Images/draw_match.jpg"
import result_bg from "../../assets/Images/win_background.png"
import Draw_match from './Draw_match'
import Someone_won from './Someone_won'

const Result_Page = () => {
  const {result,newResult }:any = useContext(SocketContext)
  console.log('newResult:', newResult)
  console.log('result:', result)
  return (
    <div className={styles.result_main_container} style={{background:`url(${result_bg})`}}>
      {
        newResult.tie_status?
        <div className={styles.draw_match_container}>Draw match
                  <Draw_match/>
        </div>
        :
        <div className={styles.someone_won_container}> Some one won the match.
                 <Someone_won/>
        </div>
         
      }
      
    </div>
  )
}

export default Result_Page