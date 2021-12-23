import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecruteurComponent } from './component/recruteur/recruteur.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { RecruteurService } from './service/recruteur.service';
import { CandidatComponent } from './component/candidat/candidat.component';
import { OffreEmploiComponent } from './component/offre-emploi/offre-emploi.component';
import { FormsModule } from '@angular/forms';
import { CandidatOffresComponent } from './component/candidat-offres/candidat-offres.component';
import { CandidatService } from './service/candidat.service';
import { OffreEmploiService } from './service/offre-emploi.service';
//import { RegisterComponent } from './component/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    RecruteurComponent,
    NavigationComponent,
    CandidatComponent,
    OffreEmploiComponent,
    CandidatOffresComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    RouterModule.forRoot([
      {
        path: "", component:OffreEmploiComponent
      },
      {
        path: "recruteur", component: RecruteurComponent
      },
      {
        //modifier de telle sorte que cela
        path: "candidat", component: CandidatComponent
      },
      {
        path: "offre", component: OffreEmploiComponent
      },
      {
        path: "candidat-offres", component: CandidatOffresComponent
      },
      {
        path:"nav", component:NavigationComponent
      }
      // {
      //   path:"login", component:RegisterComponent
      // }
    ])
  ],
  //exports: [RouterModule],
  providers: [RecruteurService, CandidatService, OffreEmploiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

