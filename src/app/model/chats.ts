export interface Chat {
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
    chats: Chat[];
}