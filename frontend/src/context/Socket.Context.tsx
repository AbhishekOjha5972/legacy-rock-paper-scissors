import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IResult, IRooms, IUser } from "../Constants/constants";
import { useNavigate } from "react-router-dom";

type contextType = {
  localSocket?: any;
  handleRoomCreator?: (name: string, room_name: string) => void;
  handleJoinRoom?: (name: string, room_name: string) => void;
  handleGetAllRooms?: () => void;
  localRooms?: [IRooms];
  playerOne?: IUser;
  playerTwo?: IUser;
  currentRoom?: IRooms;
  handleUpdateRoom?: (selectedOption: string) => void;
  result?:IResult
};

export const SocketContext = createContext<contextType | null>(null);

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigate();
  const [localSocket, setLocalSocket] = useState<any>();
  const [localRooms, setLocalRooms] = useState<[IRooms]>();
  const [playerOne, setPlayerOne] = useState<IUser>();
  const [playerTwo, setPlayerTwo] = useState<IUser>();
  const [currentRoom, setCurrentRoom] = useState<IRooms>();
  const [error, setError] = useState<boolean>(false);
  const [result, setResult] = useState<IResult>();
  const [responseMessage, setResponseMessage] = useState<string>();
  let flag  = true



  console.log("playerOne:", playerOne);
  console.log("playerTwo:", playerTwo);
  console.log("currentRoom:", currentRoom);
  console.log("responseMessage:", responseMessage);

  if (playerOne?.chance == false && playerTwo?.chance == false) {
    const pl1 = Object.keys(currentRoom?.players)[0];
    const pl2 = Object.keys(currentRoom?.players)[1];

    console.log("ME TOP PER HOON ISLIYE");

    //! This Condition for rock winner.
    if (playerOne!.choosen == "rock" && playerTwo!.choosen === "scissors") {
      currentRoom!.players[pl1].score += 1;
    } else if (
      playerOne!.choosen == "scissors" &&
      playerTwo!.choosen === "rock"
    ) {
      currentRoom!.players[pl2].score += 1;
    }

    //! This condition for paper winner.
    else if (playerOne!.choosen == "paper" && playerTwo!.choosen === "rock") {
      currentRoom!.players[pl1].score += 1;
    } else if (playerOne!.choosen == "rock" && playerTwo!.choosen === "paper") {
      currentRoom!.players[pl2].score += 1;
    }

    //! This operation for scissors winner.
    else if (
      playerOne!.choosen == "scissors" &&
      playerTwo!.choosen === "paper"
    ) {
      currentRoom!.players[pl1].score += 1;
    } else if (
      playerOne!.choosen == "paper" &&
      playerTwo!.choosen === "scissors"
    ) {
      currentRoom!.players[pl2].score += 1;
    }
    currentRoom!.players[pl1].chance = true;
    currentRoom!.players[pl2].chance = true;
  }

  // // * THIS CONDITION WILL SHOW YOU SCORE.
  if (playerOne?.lives == 0 && playerTwo?.lives == 0 && flag==true) {
    console.log("baby")
    const pl1 = Object.keys(currentRoom?.players)[0];
    const pl2 = Object.keys(currentRoom?.players)[1];


    if (currentRoom?.players[pl1].score > currentRoom?.players[pl2].score) {
      setResult({
        ...result,
        status: "winner",
        winner: currentRoom?.players[pl1],
        looser: currentRoom?.players[pl2],
      });
      
    } else if (
      currentRoom?.players[pl2].score > currentRoom?.players[pl1].score
    ) {
      setResult({
        ...result,
        status: "winner",
        winner: currentRoom?.players[pl2],
        looser: currentRoom?.players[pl1],
      });
    } else {
      setResult({ ...result, status: "tie", tie: currentRoom });
    }
    setPlayerOne(undefined)
    setPlayerTwo(undefined)
    flag=false
    localSocket.emit("delete_room", currentRoom?.roomName);
    nav("/result");
  }

  useEffect(() => {
    let socket = io("http://localhost:3000");
    setLocalSocket(socket);
    socket.on("room-created", (res, specificRoom) => {
      console.log("res:", res, specificRoom);
      setCurrentRoom(specificRoom);
      setPlayerOne(specificRoom.players[socket.id]);
    });

    socket.on("join_room", (res, room) => {
      console.log("res:", res, room);
      setCurrentRoom(room);
      setPlayerOne(room.players[Object.keys(room.players)[0]]);
      setPlayerTwo(room.players[Object.keys(room.players)[1]]);
    });

    socket.on("sending_rooms", (rooms) => {
      setLocalRooms(rooms);
    });

    //* IT WILL UPDATE THE CURRENT ROOM.
    socket.on("currentRoom", (updateRoom) => {
      setError(true);
      setCurrentRoom(updateRoom);
      setPlayerOne(updateRoom.players[Object.keys(updateRoom.players)[0]]);
      setPlayerTwo(updateRoom.players[Object.keys(updateRoom.players)[1]]);
      setError(false);
    });

    //*  IT IS TAKE CARING OF ERRORS.
    socket.on("error_message", (response) => {
      setError(false);
    });

    // *  ROOM DELETE RESPONSE.
    socket.on("response_messasge", (response) => {
      setResponseMessage(response);
    });
  }, []);

  const handleRoomCreator = (name: string, room_name: string) => {
    localSocket.emit("create_room", name, room_name);
    console.log("navigation working")
    nav("/game");
  };

  const handleJoinRoom = (name: string, room_name: string) => {
    localSocket.emit("join_room", name, room_name);
    console.log("navigation working")
    nav("/game");
  };

  //! GETTING ALL THE ROOMS
  const handleGetAllRooms = () => {
    localSocket.emit("get_rooms");
  };

  //? UPDATE THE WHOLE ROOM FUNCTION
  const handleUpdateRoom = (selectedOption: string) => {
    console.log("ME BOTTOM PER HOON PER HOON ISLIYE");
    currentRoom!.players[localSocket.id].choosen = selectedOption;
    currentRoom!.players[localSocket.id].chance = false;
    currentRoom!.players[localSocket.id].lives -= 1;
    localSocket.emit("update_currentRoom", currentRoom);
  };

  return (
    <SocketContext.Provider
      value={{
        localSocket,
        handleRoomCreator,
        handleJoinRoom,
        handleGetAllRooms,
        localRooms,
        playerOne,
        playerTwo,
        currentRoom,
        handleUpdateRoom,
        result
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
