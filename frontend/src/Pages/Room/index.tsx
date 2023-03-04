import React, { useContext, useRef, useState } from "react";
import { SocketContext } from "../../context/Socket.Context";
import { useToast } from "@chakra-ui/react";
import { IRooms } from "../../Constants/constants";
import styles from "./styles.module.css";
import room_banner from "../../assets/Images/room_page_banner.jpg";
import { Link, useNavigate } from "react-router-dom";

const Room_Page = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    handleRoomCreator,
    handleJoinRoom,
    handleGetAllRooms,
    localRooms,
  }: any = useContext(SocketContext);
  const refUserName = useRef<HTMLInputElement>(null);
  const refRoomName = useRef<HTMLInputElement>(null);
  const refSelectTag = useRef<HTMLSelectElement>(null);
  const refSelectRoomTag = useRef<HTMLSelectElement>(null);
  const [selectToggle, setSelectToggle] = useState<boolean>(false);


  return (
    <>
      <div className={styles.room_container}>
        <select
          onChange={(e) => {
            if (e.target.value === "join") {
              handleGetAllRooms();
              setSelectToggle(!selectToggle);
            } else {
              setSelectToggle(!selectToggle);
            }
          }}
          ref={refSelectTag}
          placeholder="Select option"
        >
          <option value="create">Create Room</option>
          <option value="join">Join Room</option>
        </select>

        <input ref={refUserName} placeholder="Enter your name" />

        {selectToggle ? (
          <select ref={refSelectRoomTag}>
            <option>Select room</option>
            {localRooms?.map((ele: IRooms, i: number) => {
              return (
                <option
                  value={ele.roomName}
                  disabled={ele.vacant ? false : true}
                  key={i}
                >
                  {ele.roomName}
                </option>
              );
            })}
          </select>
        ) : (
          <input ref={refRoomName} placeholder="Enter room name" />
        )}

        <button
          onClick={() => {
            if(refUserName.current!.value == ""){
              return toast({
                title: 'Please fill all the fields.',
                status: 'warning',
                duration: 9000,
                isClosable: true,
              })
            } else{
              refSelectTag.current!.value == "join"
              ? handleJoinRoom(
                  refUserName.current!.value,
                  refSelectRoomTag.current!.value
                )
              : handleRoomCreator(
                  refUserName.current!.value,
                  refRoomName.current!.value
                  );
                }}
              }
        >
          Start
        </button>
      </div>
    </>
  );
};

export default Room_Page;
