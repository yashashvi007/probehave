export interface IUserLogin {
   
    email: string,
    password: string
}

export interface IUserRegister extends IUserLogin {
    name: string,
    phone_number : string,
    
}

export interface IUser extends IUserRegister {
    _id: string,
    isAdmin?: boolean
}

export interface IUpdatePassword {
    oldPassword: string,
    newPassword: string,
    confirmPassword?: string,
    errConfirmPassword?: string
}