export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  email: string;
  token: string;
  role: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse<T> {
  data: T | null;
  success: boolean;
  message: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}
