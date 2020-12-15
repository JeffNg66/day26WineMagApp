import { Component, OnInit } from '@angular/core';

import { HttpsvcService } from './../services/httpsvc.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: string[] = []

  constructor(private httpSvc: HttpsvcService) { }

  ngOnInit(): void {
    this.getListofCountries()
  }

  getListofCountries() {
    this.httpSvc.getCountries()
    .subscribe(data => {
      this.countries = data;
      // console.info('countries  ---> ', this.countries);
    });
  }

}
