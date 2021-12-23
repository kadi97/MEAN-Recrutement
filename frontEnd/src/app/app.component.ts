import { Component, OnInit } from '@angular/core';
import { RecruteurService } from './service/recruteur.service';
import { Recruteur } from './component/recruteur/recruteur.component';

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
  }

  public getRecruteurs(): void {
    this.recruteurService.getRecruteurs()
      .then(foundRecruteurs => {
        this.recruteursList = foundRecruteurs
      });
  }
}
