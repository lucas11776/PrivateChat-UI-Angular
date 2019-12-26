export interface Account {
    profile_picture:string;
    username:string;
    email:string;
}

export interface ResetPassword {
    old_password:string;
    new_password:string;
    confirm_password:string;
}

export interface ResetPasswordResponse {
    status:boolean;
    message:string;
    date:ResetPassword;
}