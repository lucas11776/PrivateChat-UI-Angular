
export interface Friend {
    profile_picture:string;
    username:string;
    last_seen:number;
}

export interface SearchFriends {
    number_results:number;
    results:Friend[]
}

export interface FriendMessageCout {
    profile_picture:string;
    username:string;
    last_seen:number;
    messages:number;
}

export interface FriendsChatPreview {
    profile_picture:string;
    username:string;
    last_seen:number;
    number_messages:number;
    type:string;
    content:string;
}

export interface FriendRequest {
    profile_picture:string;
    username:string;
    created:string;
    last_seen:number;
}

export interface Response {
    status:boolean;
    message:string;
    data:object;
}