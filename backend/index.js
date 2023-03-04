const io = require("socket.io")(3000, {
    cors: {
      origin: ["http://localhost:5173"],
    },
  });


  let rooms = [];

  io.on('connection',(socket)=>{
    console.log("socket Id",socket.id)
        socket.on("create_room",(user_name,room_name)=>{     
            const existing_room_with_same_name = rooms.filter((ele)=>ele.roomName===room_name)
            if(existing_room_with_same_name.length<=0){
                let room = {
                    roomName:room_name,
                    vacant:true,
                    players:{
                        [socket.id]:
                        {   user_name,
                            score:0,
                            lives:3,
                            chance:true,
                            choosen:null
                        }
                    }
                }
                rooms.push(room)
                socket.join(room_name)
                io.to(socket.id).emit("room-created",`${room_name} room created.`,room)
                // io.emit("room-created",`${room_name} room created.`,rooms)
                io.emit("sending_rooms",rooms)

            }
            else{
                io.to(socket.id).emit("room-created",`${room_name} room already exist.`)
            } 
        })


        //? JOIN ROOM
        socket.on("join_room",(user_name,room_name)=>{
            const existing_room_with_same_name = rooms.filter((ele)=>ele.roomName===room_name)

            if(existing_room_with_same_name.length &&existing_room_with_same_name[0].vacant==true){
                existing_room_with_same_name[0].players[socket.id]={user_name,score:0,lives:3,chance:true,choosen:null}
                existing_room_with_same_name[0].vacant=false
                socket.join(room_name)
                // console.log('rooms:', rooms)
                io.to(room_name).emit("join_room",`${user_name} successfully joined ${room_name} room.`,
                existing_room_with_same_name[0]
                )
                io.emit("sending_rooms",rooms)

            }
            else{
            io.to(socket.id).emit("join_room",`${existing_room_with_same_name.length? 
                `${room_name} has been filled`:
                `${room_name} room not exist.`}`
                )
            };
        })

        //? GETTING ALL ROOMS 

        socket.on("get_rooms",()=>{
            io.to(socket.id).emit("sending_rooms",rooms)
        })


        // ?  UPDATE THE SPECIFIC ROOM EVENT
        socket.on("update_currentRoom",(specificRoom)=>{
            let index = rooms.findIndex(room=>room.roomName===specificRoom.roomName)

            if(index>=0){
                rooms[index]=specificRoom;
                io.to(specificRoom.roomName).emit("currentRoom",rooms[index]);
            }else{
                io.to(specificRoom.roomName).emit('error_message',`Something went wrong in ${specificRoom.roomName} room.`)
            }

        })


        //? DELETE THE ROOM EVENT
        socket.on("delete_room",(room_name)=>{
            let index = rooms.findIndex(room=>room.roomName===room_name)
            rooms.splice(index,1);
            io.to(room_name).emit("response_messasge",`Thank for playing with us.`)
            socket.leave(room_name);
        })

  })


