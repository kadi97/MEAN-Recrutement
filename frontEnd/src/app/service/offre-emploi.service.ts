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

  private handleError(err: any): Promise<any>{
    console.log("Something went wrong ", err);
    return Promise.reject(err.message || err);
    
  }
}
