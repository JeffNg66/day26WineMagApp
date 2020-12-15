import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesComponent } from './components/countries.component';
import { CountryComponent } from './components/country.component';
import { WineComponent } from './components/wine.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    CountryComponent,
    WineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
