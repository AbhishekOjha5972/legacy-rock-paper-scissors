import React, { useContext } from 'react'
import { SocketContext } from '../../context/Socket.Context'

const Result_Page = () => {
  const {result }:any = useContext(SocketContext)
  console.log('result:', result)
  return (
    <div>Result_Page</div>
  )
}

export default Result_Page