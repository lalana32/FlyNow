export interface LoginResponse {
  id: string;
  username: string;
  email: string;
  token: string;
  role: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}
