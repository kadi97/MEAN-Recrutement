import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecruteurService } from 'src/app/service/recruteur.service';

@Component({
  selector: 'app-recruteur',
  templateUrl: './recruteur.component.html',
  styleUrls: ['./recruteur.component.css']
})
export class RecruteurComponent implements OnInit {
  title = 'module de recrutement';
  recruteursList!: Recruteur[];
  editRecruteur!: Recruteur;
  deleteRecruteur!: Recruteur;
  constructor(private recruteurService:RecruteurService){}

  ngOnInit(): void{
    this.getRecruteurs();
    console.log(this.recruteursList);
  }

  public getRecruteurs(): void {
    this.recruteurService.getRecruteurs()
      .then(foundRecruteurs => this.recruteursList = foundRecruteurs);
  }

  public onAddRecruteur(addForm: NgForm): void {
    const form = document.getElementById('add-Recruteur-form');
    form?.click();
    //console.log(addForm.value);
    this.recruteurService.addRecruteur(addForm.value);
    // window.location.reload();
  }

  public onUpdateRecruteur(Recruteur: Recruteur): void {
    this.recruteurService.updateRecruteur(Recruteur);
    // window.location.reload();
  }

  public onDeleteRecruteur(employeeId: string): void {
    this.recruteurService.deleteRecruteur(employeeId);
    // window.location.reload();
  }

  public searchRecruteurs(key: string): void {
    console.log(key);
    const results: Recruteur[] = [];
    for (const recruteur of this.recruteursList) {
      if (recruteur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || recruteur.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || recruteur.telephone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || recruteur.adresse.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(recruteur);
      }
    }
    this.recruteursList = results;
    if (results.length === 0 || !key) {
      this.getRecruteurs();
    }
  }

  public onOpenModal(Recruteur: Recruteur, mode: string): void {
    console.log("Recruteur: ", Recruteur?.nom, " mode: ", mode);
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addRecruteurModal');
    }
    if (mode === 'edit') {
      this.editRecruteur = Recruteur;
      button.setAttribute('data-target', '#updateRecruteurModal');
      console.log(button.getAttribute('data-target'));
      
    }
    if (mode === 'delete') {
      this.deleteRecruteur = Recruteur;
      button.setAttribute('data-target', '#deleteRecruteurModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public isLoggedIn(){
    return true;
  }
}

export class Recruteur{
  _id!:string;
  nom!:string;
  prenom!:string;
  adresse!:string;
  telephone!:string;
  sexe!:string;
  dob!:Date;
  email!:string;
}