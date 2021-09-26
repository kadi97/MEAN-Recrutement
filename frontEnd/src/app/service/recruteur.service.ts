import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recruteur } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {
  private apiBaseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public getRecruteurs(): Promise<Recruteur[]> {
    const url:string = this.apiBaseUrl+"/recruteur";
    return this.http.get(url).toPromise()
        .then(response => response as Recruteur[])
        .catch(this.handleError);
  }

  private handleError(err: any): Promise<any>{
    console.log("Something went wrong ", err);
    return Promise.reject(err.message || err);
    
  }
}
