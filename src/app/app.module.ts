import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EditorModule, SharedModule, RadioButtonModule } from 'primeng/primeng';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuotePanoramaComponent } from './components/quotes/quote-panorama/quote-panorama.component';
import { SharedService } from './services/shared.service';
import { QuoteCategoryComponent } from './components/quotes/quote-category/quote-category.component';
import { NavbarModule } from './components/navbar';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    QuotePanoramaComponent,
    QuoteCategoryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EditorModule,
    SharedModule,
    RadioButtonModule,
    NavbarModule,
    RouterModule.forRoot([
      { path: '', component: QuotePanoramaComponent },
      { path: 'home', redirectTo: ''},
      { path: 'quote/:id', component: QuotePanoramaComponent},
      { path: 'categories', component: QuoteCategoryComponent },
      { path: '**', redirectTo: '', pathMatch: 'full'}
    ])
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
