import { Component, OnInit } from '@angular/core';
import { RecruteurService } from './service/recruteur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Application de recrutement';
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