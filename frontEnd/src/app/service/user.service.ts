import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public getUser(user: User): Promise<User[]> {
    const url:string = this.apiBaseUrl+"/user/"+user.username;
    return this.http.get(url).toPromise()
        .then(response => response as User[])
        .catch(this.handleError);
  }

  private handleError(err: any): Promise<any>{
    console.log("Something went wrong ", err);
    return Promise.reject(err.message || err);
  }
}

export class User{
  _id!:string;
  username!:string;
  password!:string;
  role!:string;
}
