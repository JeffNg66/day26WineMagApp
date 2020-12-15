import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesComponent } from './components/countries.component';
import { CountryComponent } from './components/country.component';
import { WineComponent } from './components/wine.component';

const routes: Routes = [
  { path: "list", component: CountriesComponent },
  { path: "country/:c", component: CountryComponent },
  { path: "wine/:w", component: WineComponent },
  { path: "", redirectTo: "/list", pathMatch: "full" },
  { path: "**", redirectTo: "/list", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }