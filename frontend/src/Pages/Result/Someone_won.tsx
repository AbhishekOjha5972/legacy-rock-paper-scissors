import React, { useContext } from 'react'
import { SocketContext } from '../../context/Socket.Context'

const Someone_won = () => {
    const {newResult}:any = useContext(SocketContext)
    console.log('newResult:', newResult)
  return (
    <div>Someone_won</div>
  )
}

export default Someone_won