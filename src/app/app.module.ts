import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EditorModule, SharedModule, RadioButtonModule } from 'primeng/primeng';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuotePanoramaComponent } from './quotes/quote-panorama/quote-panorama.component';
import { HeaderComponent } from './header/header.component';
import { SharedService } from './shared.service';
import { QuoteCategoryComponent } from './quotes/quote-category/quote-category.component';

@NgModule({
  declarations: [
    AppComponent,
    QuotePanoramaComponent,
    HeaderComponent,
    QuoteCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EditorModule,
    SharedModule,
    RadioButtonModule,
    RouterModule.forRoot([
      { path: '', component: QuotePanoramaComponent },
      { path: 'categories', component: QuoteCategoryComponent },
      { path: '**', redirectTo: '', pathMatch: 'full'}
    ])
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
