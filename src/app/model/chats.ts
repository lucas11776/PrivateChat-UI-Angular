export interface Chat {
    chat_id:number;
    creeated:string;
    profile_picture:string;
    from:string;
    to:string;
    type:string;
    content:string;
}

export interface ChatsResponse {
    user:string;
    friend:string;
    total:number;
    chats: Chat[];
}

export interface SendText {
    username:string;
    text:string;
}

export interface SendTextResponse {
    status:boolean;
    message:string;
    data:SendText;
}

export interface Response {
    status:boolean;
    message:string;
    data:[];
}