import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecruteurComponent } from './component/recruteur/recruteur.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { RecruteurService } from './service/recruteur.service';
import { CandidatComponent } from './component/candidat/candidat.component';

@NgModule({
  declarations: [
    AppComponent,
    RecruteurComponent,
    NavigationComponent,
    CandidatComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot([
      {
        path: "", component:AppComponent
      },
      {
        path: "recruteur", component: RecruteurComponent
      },
      {
        //modifier de telle sorte que cela
        path: "candidat", component: CandidatComponent
      },
      {
        path:"nav", component:NavigationComponent
      }
    ])
  ],
  //exports: [RouterModule],
  providers: [RecruteurService],
  bootstrap: [AppComponent]
})
export class AppModule { }
