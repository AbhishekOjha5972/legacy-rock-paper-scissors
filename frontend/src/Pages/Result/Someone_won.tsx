import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../context/Socket.Context'
import styles from "./styles.module.css"
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {FaCrown , FaSadCry} from "react-icons/fa"


import you_won from "../../assets/Images/win.png"
import you_lose from "../../assets/Images/lose.png"
import left_hand_winner from "../../assets/Images/left_hand_winner.jpg";
import left_hand_looser from "../../assets/Images/left_hand_looser.jpg";
import right_hand_winner from "../../assets/Images/right_hand_winner.jpg";
import right_hand_looser from "../../assets/Images/right_hand_looser.jpg";
import { IWinnerAndUser } from '../../Constants/constants'



const Someone_won = () => {
    const {newResult,localSocket}:any = useContext(SocketContext)
    const [statusShowImage,setStatusShowImage] = useState<string>()
    const [winnerAndLooserImage,setWinnerAndLooserImage] = useState<string>()
    const [winner,setWinner] = useState<IWinnerAndUser|undefined>()
    const [looser,setLooser] = useState<IWinnerAndUser|undefined>()

    useEffect(()=>{
        if(newResult){
            let pl1 = Object.keys(newResult.socket_data)[0]
            let pl2 = Object.keys(newResult.socket_data)[1]
            
            let statuImage = newResult.socket_data[localSocket.id].status=="winner"?
                            you_won:you_lose
                            
             let userImage;
             if(pl1==localSocket.id){
              userImage = newResult.socket_data[localSocket.id].status=="winner"?
                             left_hand_winner:left_hand_looser
             } 
             if(pl2==localSocket.id){
                 userImage = newResult.socket_data[localSocket.id].status=="winner"?
                                right_hand_winner:right_hand_looser
            } 
            if(newResult.socket_data[pl1].status=="winner"){
                setWinner(newResult.socket_data[pl1])
                setLooser(newResult.socket_data[pl2])
            }else{
                setWinner(newResult.socket_data[pl2])
                setLooser(newResult.socket_data[pl1])
            }
            setStatusShowImage(statuImage)
            setWinnerAndLooserImage(userImage)
        }
    },[])


  return (
    <div className={styles.someone_won_container}>

        <div className={styles.won_content}>
                {/* //? STATUS SHOW DIV */}
                <div className={styles.won_and_lose_status}>
                    <img src={statusShowImage}/>
                </div>
                {/* //? WINNER AND LOOSER IMAGE SHOW DIV */}
                <div className={styles.won_and_lose_avatar}>
                    <img src={winnerAndLooserImage} />
                </div>
                
                {/* //? SCORE STATISTIC*/}
                <div className={styles.won_and_lose_statistic}>
                     {/* //! some data will come*/}
                     <div>
                        <div>
                            <FaCrown color='#ffe701'/>
                        </div>
                        <div>
                            <span>{winner?.info?.user_name}</span>
                            <span>SCORE: {winner?.info?.score}</span>
                        </div>
                     </div>
                     <div>
                     <div>
                            <FaSadCry color='#ffe701'/>
                        </div>
                        <div>
                            <span>{looser?.info?.user_name}</span>
                            <span>SCORE: {looser?.info?.score}</span>
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

export default Someone_won
