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