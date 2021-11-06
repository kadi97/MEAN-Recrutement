import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidatService } from 'src/app/service/candidat.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {
  candidatsList!: Candidat[];
  editCandidat!: Candidat;
  deleteCandidat!: Candidat;
  constructor(private candidatService:CandidatService){}

  ngOnInit(): void{
    this.getCandidats();
    console.log(this.candidatsList);
    
  }

  public getCandidats(): void {
    this.candidatService.getCandidats()
      .then(foundCandidats => this.candidatsList = foundCandidats);
  }

  public onAddCandidat(addForm: NgForm): void {
    const form = document.getElementById('add-candidat-form');
    form?.click();
    //console.log(addForm.value);
    this.candidatService.addCandidat(addForm.value);
    //window.location.reload();
  }

  public onUpdateCandidat(candidat: Candidat): void {
    this.candidatService.updateCandidat(candidat);
    //window.location.reload();
  }

  public onDeleteCandidat(employeeId: string): void {
    this.candidatService.deleteCandidat(employeeId);
    //window.location.reload();
  }

  public searchCandidats(key: string): void {
    console.log(key);
    const results: Candidat[] = [];
    for (const employee of this.candidatsList) {
      if (employee.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.telephone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.adresse.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.candidatsList = results;
    if (results.length === 0 || !key) {
      this.getCandidats();
    }
  }

  public onOpenModal(candidat: Candidat, mode: string): void {
    console.log("Candidat: ", candidat?.nom, " mode: ", mode);
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCandidatModal');
    }
    if (mode === 'edit') {
      this.editCandidat = candidat;
      button.setAttribute('data-target', '#updateCandidatModal');
      console.log(button.getAttribute('data-target'));
      
    }
    if (mode === 'delete') {
      this.deleteCandidat = candidat;
      button.setAttribute('data-target', '#deleteCandidatModal');
    }
    container?.appendChild(button);
    button.click();
  }
}

export class Candidat{
  _id!:string;
  nom!:string;
  prenom!:string;
  adresse!:string;
  telephone!:string;
  cv!:string;
  dob!:Date;
  email!:string;
}