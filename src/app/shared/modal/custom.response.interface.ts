export interface UserData {
  id?: string;
  email?: string;
  roles?: string[];
  accessToken?: string;

}

export interface TaskResponse {
  id: number,
  userId: number,
  originText: string,
  status: string,
  description: string,
  name: string,
  createdAt: string,
  updatedAt: string
}

export interface UpdateTaskRequest {
  id: string,
  userId: string,
  status: string
}
export interface Translation {
  id?: number,
  userId?: string,
  translatedText: string,
  translatedTo: string,
  createdAt: string,
  updatedAt?: string,
  username?:string
}
export interface UserDTO{
  id: string | number,
  username: string,
  email: string,
}
export interface CustomResponse{
  status:string;
  data:any;
  message:string;
}
