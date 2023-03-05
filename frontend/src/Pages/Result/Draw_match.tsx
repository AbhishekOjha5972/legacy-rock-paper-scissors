import React, { useContext } from 'react'
import { SocketContext } from '../../context/Socket.Context'

const Draw_match = () => {
    const {newResult}:any = useContext(SocketContext)
    console.log('newResult:', newResult)
  return (
    <div>Draw_match</div>
  )
}

export default Draw_match