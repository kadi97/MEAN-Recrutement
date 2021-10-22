import { Component, OnInit } from '@angular/core';
import { OffreEmploiService } from '../../service/offre-emploi.service';

@Component({
  selector: 'app-offre-emploi',
  templateUrl: './offre-emploi.component.html',
  styleUrls: ['./offre-emploi.component.css']
})
export class OffreEmploiComponent implements OnInit {

  title = 'Offre ';
  offresList!: OffreEmploi[];

  constructor(private offreService:OffreEmploiService){}
  
  ngOnInit(): void{
    this.getOffreEmplois();
    console.log(this.offresList);
    
  }

  public getOffreEmplois(): void {
    this.offreService.getOffreEmplois()
      .then(offresTrouves => this.offresList = offresTrouves);
  }

}


export class OffreEmploi{
  _id!:string;
  intitule!:string;
  statut!:string;
  description!:string;
  date_fin_publication!:Date;
  date_publication!:Date;
}