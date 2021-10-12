import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/service/candidat.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {
  title = 'Candidat';
  candidatsList!: Candidat[];
  constructor(private candidatService:CandidatService){}

  ngOnInit(): void{
    this.getCandidats();
    console.log(this.candidatsList);
    
  }

  public getCandidats(): void {
    this.candidatService.getCandidats()
      .then(foundCandidats => this.candidatsList = foundCandidats);
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