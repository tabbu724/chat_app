// interface definition
export interface Message{
    senderName: string,
    senderId: string,
    receiverName: string,
    receiverId: string,
    message: string,
    createdOn: Date
}

export interface UserAuthorised{
    checkStatus():boolean
}