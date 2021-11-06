import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OffreEmploi } from '../component/offre-emploi/offre-emploi.component';

@Injectable({
  providedIn: 'root'
})
export class OffreEmploiService {
  private apiBaseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public getOffreEmplois(): Promise<OffreEmploi[]> {
    const url:string = this.apiBaseUrl+"/offre_emploi";
    return this.http.get(url).toPromise()
        .then(response => response as OffreEmploi[])
        .catch(this.handleError);
  }

  public addOffreEmploi(offre:OffreEmploi): Promise<OffreEmploi> {
    console.log("service layer: ",offre);
    
    const url:string = this.apiBaseUrl+"/offre_emploi";
    return this.http.post(url, offre).toPromise()
        .then(response => response as OffreEmploi)
        .catch(this.handleError);
  }

  public deleteOffreEmploi(candidatId:string): Promise<void> {
    const url:string = this.apiBaseUrl+"/offre_emploi/"+candidatId;
    return this.http.delete(url).toPromise()
        .then(response => response as OffreEmploi)
        .catch(this.handleError);
  }

  public updateOffreEmploi(offre:OffreEmploi): Promise<OffreEmploi> {
    const url:string = this.apiBaseUrl+"/offre_emploi/"+offre._id;
    return this.http.put(url, offre).toPromise()
        .then(response => response as OffreEmploi)
        .catch(this.handleError);
  }

  private handleError(err: any): Promise<any>{
    console.log("Something went wrong ", err);
    return Promise.reject(err.message || err);
    
  }
}
