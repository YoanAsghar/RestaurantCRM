export class User{
  id?: number;
  userName: string;
  passwordHash: string;
  role: string;

  constructor(userName: string, password: string){
    this.userName = userName;
    this.passwordHash = password;
    this.role = "";
  }
}
