import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidatService } from 'src/app/service/candidat.service';
import { OffreEmploiService } from '../../service/offre-emploi.service';
import { Candidat } from '../candidat/candidat.component';

@Component({
  selector: 'app-offre-emploi',
  templateUrl: './offre-emploi.component.html',
  styleUrls: ['./offre-emploi.component.css']
})
export class OffreEmploiComponent implements OnInit {

  title = 'OffreEmploi ';
  offresList!: OffreEmploi[];
  candidatList!: Candidat[];
  editOffer!: OffreEmploi;
  deleteOffer!: OffreEmploi;
  readOffer!: OffreEmploi;
  constructor(private offreService:OffreEmploiService, private candidatService:CandidatService){}
  
  ngOnInit(): void{
    this.getOffers();
    this.getCandidats();
    console.log(this.offresList);
    
  }

  public getOffers(): void {
    this.offreService.getOffreEmplois()
      .then(offres => this.offresList = offres);
  }

  public getCandidats(): void {
    this.candidatService.getCandidats()
      .then(result => this.candidatList = result);
  }

  public onAddOffer(addForm: NgForm): void {
    console.log(addForm.value);
    
    const form = document.getElementById('add-offre-form');
    form?.click();
    //console.log(addForm.value);
    this.offreService.addOffreEmploi(addForm.value);
    window.location.reload();
  }

  public onUpdateOffer(OffreEmploi: OffreEmploi): void {
    this.offreService.updateOffreEmploi(OffreEmploi);
    window.location.reload();
  }

  public onDeleteOffer(employeeId: string): void {
    this.offreService.deleteOffreEmploi(employeeId);
    window.location.reload();
  }

  public searchOffreEmplois(key: string): void {
    console.log(key);
    const results: OffreEmploi[] = [];
    for (const offre of this.offresList) {
      if (offre.intitule.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || offre.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || offre.statut.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(offre);
      }
    }
    this.offresList = results;
    if (results.length === 0 || !key) {
      this.getOffers();
    }
  }

  public onOpenModal(OffreEmploi: OffreEmploi, mode: string): void {
    console.log("Offre: ", OffreEmploi?.intitule, " mode: ", mode);
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addOfferModal');
    }
    if (mode === 'edit') {
      this.editOffer = OffreEmploi;
      button.setAttribute('data-target', '#updateOfferModal');
      console.log(button.getAttribute('data-target'));
      
    }
    if (mode === 'delete') {
      this.deleteOffer = OffreEmploi;
      button.setAttribute('data-target', '#deleteOfferModal');
    }
    if (mode === 'read') {
      this.readOffer = OffreEmploi;
      button.setAttribute('data-target', '#readOfferModal');
    }
    container?.appendChild(button);
    button.click();
  }
  public isLoggedIn(){
    return true;
  }

  public postuler(offre: OffreEmploi){
    //ajout de l'offe dans la liste des offres du candidat
    let candidat = this.getCandidatByEmail("sdiallo@miu.edu");
    candidat.offre_emploi.push(offre);
    console.log("candidat avant update: ", candidat);
    
    this.candidatService.updateCandidat(candidat);


    //ajout du candidat dans la liste des candidats pour cette offre
    // offre.candidat.push(candidat);
    // this.offreService.updateOffreEmploi(offre);
    console.log("updated offer: ", offre);
    
  }

  public getCandidatByEmail(email:string): Candidat
  {
    let candidatTrouve = this.candidatList.filter(candidat => candidat.email === email);
    return candidatTrouve[0];
  }

}


export class OffreEmploi{
  _id!:string;
  intitule!:string;
  statut!:string;
  description!:string;
  date_fin_publication!:Date;
  date_publication!:Date;
  candidat!:Candidat[]
}