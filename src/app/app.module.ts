import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EditorModule, SharedModule, RadioButtonModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { QuotePanoramaComponent } from './quotes/quote-panorama/quote-panorama.component';
import { HeaderComponent } from './header/header.component';
import { SharedService } from './shared.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    QuotePanoramaComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EditorModule,
    SharedModule,
    RadioButtonModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
