export interface User{
  name: string;
  password: string;
  email: string;
}

export interface SignupResponseApi {
  status: number;
  message: string;
  data: {
    user: User;
  };
}

export interface LoginResponseApi {
  status: number;
  message: string;
  data: {
    userToken: string;
  };
}

export interface LogoutResponseApi {
  status: number;
  message: string;
}
