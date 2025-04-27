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

