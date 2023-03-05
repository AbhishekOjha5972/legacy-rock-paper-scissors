import React, { useContext, useState,useEffect } from 'react'
import { SocketContext } from '../../context/Socket.Context'
import styles from "./styles.module.css"
import { IUser} from '../../Constants/constants'
import { Link } from 'react-router-dom'
import {FaCrown} from "react-icons/fa"
import draw from "../../assets/Images/draw.png"
import draw_match from "../../assets/Images/draw_match.jpg"


const Draw_match = () => {
     const {newResult,localSocket}:any = useContext(SocketContext)
    const [playerOne,setPlayerOne] = useState<IUser|undefined>()
    const [playerTwo,setPlayerTwo] = useState<IUser|undefined>()
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
                    <img src={draw} />
                </div>
                {/* //? WINNER AND LOOSER IMAGE SHOW DIV */}
                <div className={styles.won_and_lose_avatar}>
                    <img src={draw_match}  />
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
                            <FaCrown color='#ffe701'/>
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