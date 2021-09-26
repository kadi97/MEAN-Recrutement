import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecruteurComponent } from './component/recruteur/recruteur.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { RecruteurService } from './service/recruteur.service';

@NgModule({
  declarations: [
    AppComponent,
    RecruteurComponent,
    NavigationComponent
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
        path:"nav", component:NavigationComponent
      }
    ])
  ],
  providers: [RecruteurService],
  bootstrap: [AppComponent]
})
export class AppModule { }
