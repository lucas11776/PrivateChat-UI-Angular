export interface Register {
    username:string,
    email:string,
    password:string;
    confirm_password:string;
}

export interface RegisterResponse {
    status:boolean,
    message:string;
    data: Register;
}

export interface Login {
    username:string;
    password:string;
}

export interface LoginResponse {
    status:boolean,
    message:string,
    data: { token:string }
}

export interface Authorization {
    status:boolean;
}

export interface Notification {
    chats:number;
    messages:number;
    
}