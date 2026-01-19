export interface AuthModel {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
}

export interface ServiceResponseModel {
  success: boolean;
  message: string;
  data?: any;
}
