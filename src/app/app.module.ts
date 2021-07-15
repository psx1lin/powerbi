import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResidestService } from './services/residest.service';
import { GotourlComponent } from './gotourl/gotourl.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GotourlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ResidestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
