import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Candidat } from '../component/candidat/candidat.component';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  
  private apiBaseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public getCandidats(): Promise<Candidat[]> {
    const url:string = this.apiBaseUrl+"/candidat";
    return this.http.get(url).toPromise()
        .then(response => response as Candidat[])
        .catch(this.handleError);
  }

  public addCandidat(candidat:Candidat): Promise<Candidat> {
    const url:string = this.apiBaseUrl+"/candidat";
    return this.http.post(url, candidat).toPromise()
        .then(response => response as Candidat)
        .catch(this.handleError);
  }

  public deleteCandidat(candidatId:string): Promise<void> {
    const url:string = this.apiBaseUrl+"/candidat/"+candidatId;
    return this.http.delete(url).toPromise()
        .then(response => response as Candidat)
        .catch(this.handleError);
  }

  public updateCandidat(candidat:Candidat): Promise<Candidat> {
    const url:string = this.apiBaseUrl+"/candidat/"+candidat._id;
    return this.http.put(url, candidat).toPromise()
        .then(response => response as Candidat)
        .catch(this.handleError);
  }

  private handleError(err: any): Promise<any>{
    console.log("Something went wrong ", err);
    return Promise.reject(err.message || err);
  }
}
