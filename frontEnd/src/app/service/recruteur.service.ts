import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recruteur } from '../component/recruteur/recruteur.component';

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

  public addRecruteur(recruteur:Recruteur): Promise<Recruteur> {
    const url:string = this.apiBaseUrl+"/recruteur";
    return this.http.post(url, recruteur).toPromise()
        .then(response => response as Recruteur)
        .catch(this.handleError);
  }

  public deleteRecruteur(candidatId:string): Promise<void> {
    const url:string = this.apiBaseUrl+"/recruteur/"+candidatId;
    return this.http.delete(url).toPromise()
        .then(response => response as Recruteur)
        .catch(this.handleError);
  }

  public updateRecruteur(recruteur:Recruteur): Promise<Recruteur> {
    const url:string = this.apiBaseUrl+"/recruteur/"+recruteur._id;
    return this.http.put(url, recruteur).toPromise()
        .then(response => response as Recruteur)
        .catch(this.handleError);
  }

  private handleError(err: any): Promise<any>{
    console.log("Something went wrong ", err);
    return Promise.reject(err.message || err);
    
  }
}
