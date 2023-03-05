import React, { useContext, useState,useEffect } from 'react'
import { SocketContext } from '../../context/Socket.Context'
import styles from "./styles.module.css"
import { IUser, IWinnerAndUser } from '../../Constants/constants'
import { Link } from 'react-router-dom'
import {FaCrown , FaSadCry} from "react-icons/fa"

import you_won from "../../assets/Images/win.png"
import you_lose from "../../assets/Images/lose.png"
import left_hand_winner from "../../assets/Images/left_hand_winner.jpg";
import left_hand_looser from "../../assets/Images/left_hand_looser.jpg";
import right_hand_winner from "../../assets/Images/right_hand_winner.jpg";
import right_hand_looser from "../../assets/Images/right_hand_looser.jpg";
import draw from "../../assets/Images/draw.png"
import draw_match from "../../assets/Images/draw_match.jpg"


const Draw_match = () => {
     const {newResult,localSocket}:any = useContext(SocketContext)
    const [playerOne,setPlayerOne] = useState<IUser|undefined>()
    const [playerTwo,setPlayerTwo] = useState<IUser|undefined>()
    console.log('playerOne:', playerOne)
    console.log('playerTwo:', playerTwo)
    console.log('newResult:', newResult)
    useEffect(()=>{
        if(newResult){
            let pl1 = Object.keys(newResult.tie_data.players)[0]
            let pl2 = Object.keys(newResult.tie_data.players)[1]
                setPlayerOne(newResult.tie_data.players[pl1])
                setPlayerTwo(newResult.tie_data.players[pl2])
        }
        
    },[])
  return (
    <div className={styles.draw_match_container}>

<div className={styles.won_content}>
                {/* //? STATUS SHOW DIV */}
                <div className={styles.won_and_lose_status}>
                    <img src={draw}/>
                </div>
                {/* //? WINNER AND LOOSER IMAGE SHOW DIV */}
                <div className={styles.won_and_lose_avatar}>
                    <img src={draw_match} />
                </div>
                
                {/* //? SCORE STATISTIC*/}
                <div className={styles.won_and_lose_statistic}>
                     {/* //! some data will come*/}
                     <div>
                        <div>
                            <FaCrown color='#ffe701'/>
                        </div>
                        <div>
                            <span>{playerOne?.user_name}</span>
                            <span>SCORE: {playerOne?.score}</span>
                        </div>
                     </div>
                     <div>
                     <div>
                            <FaSadCry color='#ffe701'/>
                        </div>
                        <div>
                            <span>{playerTwo?.user_name}</span>
                            <span>SCORE: {playerTwo?.score}</span>
                        </div>
                     </div>
                </div>
        </div>
         {/* //? NAVIGATION FOR HOME PAGE & ROOM PAGE*/}
        <div className={styles.won_navigation_div}>
            <Link to="/room">Continue Play</Link>
            <Link  to="/">Home</Link>
        </div>
    </div>
  )
}

export default Draw_match