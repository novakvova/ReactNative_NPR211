export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: File | null
}

export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  photo: string
  exp: number
}

//Повна інформація про користувача
export interface IUserState {
  user: IUser | null
  token: string | null
}

