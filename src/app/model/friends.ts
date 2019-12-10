
export interface Friend {
    profile_picture:string;
    username:string;
    last_seen:number;
}

export interface SearchFriends {
    number_results:number;
    results:Friend[]
}