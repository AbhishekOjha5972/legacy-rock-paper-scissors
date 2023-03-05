export interface IChoosenType{
    rock?:string,
    paper?:string,
    scissors?:string

}

export interface IUser{
    user_name:string,
    score:number,
    lives:number,
    chance:boolean,
    choosen?:string | null
}


export interface IRooms{
    players:{}|any,
    roomName:string,
    vacant:boolean
}

export interface IResult{
    status:string,
    winner?:IUser,
    looser?:IUser,
    tie?:IRooms
}

export interface INewResult{
    tie_status:boolean,
    tie_data?:IRooms|null
    socket_data?:{}|any
}
