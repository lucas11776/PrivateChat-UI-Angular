export interface chat {
    chat_id:number;
    creeated:string;
    profile_picture:string;
    from:string;
    to:string;
}

export interface ChatsResponse {
    user:string;
    friend:string;
    total:number;
    chats: chat[];
}