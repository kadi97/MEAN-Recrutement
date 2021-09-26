import { Component, OnInit } from '@angular/core';
import { RecruteurService } from 'src/app/service/recruteur.service';

@Component({
  selector: 'app-recruteur',
  templateUrl: './recruteur.component.html',
  styleUrls: ['./recruteur.component.css']
})
export class RecruteurComponent implements OnInit {
  title = 'Partie recrutement';
  recruteursList!: Recruteur[];
  constructor(private recruteurService:RecruteurService){}

  ngOnInit(): void{
    this.getRecruteurs();
    console.log(this.recruteursList);
    
  }

  public getRecruteurs(): void {
    this.recruteurService.getRecruteurs()
      .then(foundRecruteurs => this.recruteursList = foundRecruteurs);
  }
}

export class Recruteur{
  _id!:string;
  nom!:string;
  prenom!:string;
  adresse!:string;
  telephone!:string;
  dob!:Date;
}