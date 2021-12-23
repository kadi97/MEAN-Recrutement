import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidatService } from 'src/app/service/candidat.service';
import { OffreEmploiService } from 'src/app/service/offre-emploi.service';
import { Candidat } from '../candidat/candidat.component';

@Component({
  selector: 'app-candidat-offres',
  templateUrl: './candidat-offres.component.html',
  styleUrls: ['./candidat-offres.component.css']
})
export class CandidatOffresComponent implements OnInit {

  title = 'OffreEmploi ';
  offresList!: OffreEmploi[];
  offresCandidat!: OffreEmploi[];
  candidatList!: Candidat[];
  editOffer!: OffreEmploi;
  deleteOffer!: OffreEmploi;
  readOffer!: OffreEmploi;
  constructor(private offreService:OffreEmploiService, private candidatService:CandidatService){}
  
  
  ngOnInit(): void{
    // this.getCandidats();
    this.candidatOffres();
  }
  public getCandidats(): void {
    this.candidatService.getCandidats()
      .then(result => {
        this.candidatList = result;
      });
  }

  public getCandidatByEmail(email:string): Candidat
  {
    console.log("list des candidats: ", this.candidatList);
    let candidatTrouve = this.candidatList!.filter(candidat => candidat.email === email);
    return candidatTrouve?candidatTrouve[0]:new Candidat;
  }

  public candidatOffres(): void {
    this.candidatService.getCandidats()
      .then(result => {
        this.candidatList = result;
        let candidat = result!.filter(candidat => candidat.email === "sdiallo@miu.edu");
        this.offresCandidat = candidat[0]!.offre_emploi;
        console.log(this.offresCandidat);
      });
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
    let offreExistante = candidat.offre_emploi.find(offer => offer._id === offre._id);
    if (!offreExistante){
      candidat.offre_emploi.push(offre);
      alert("Candidature prise en compte");
      window.location.reload();
    } else
      alert("Vous avez deja postulé a cette offre!");

    this.candidatService.updateCandidat(candidat);
    //ajout du candidat dans la liste des candidats pour cette offre
    // offre.candidat.push(candidat);
    // this.offreService.updateOffreEmploi(offre);
    console.log("updated offer: ", offre);
    
  }

  public annulerCandidature(offre: OffreEmploi){
    let candidat = this.getCandidatByEmail("sdiallo@miu.edu");
    candidat.offre_emploi.forEach(offer => {

      if (offer._id === offre._id) {
        candidat.offre_emploi.pop();
        alert("candidature retiree!");
      }
    });
    this.candidatService.updateCandidat(candidat);
    console.log("updated candidat: ", candidat);
    
    window.location.href = "candidat-offres";
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
