import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsvcService } from '../services/httpsvc.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  wines: string[] = []
  country: string

  constructor(private httpSvc: HttpsvcService,
              private activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.country = this.activatedRoute.snapshot.params['c']
    console.log('params --->', this.country)
    this.getWines(this.country)
  }

  getWines(c) {
    this.httpSvc.getfromCountry(c)
    .subscribe(data => {
      this.wines = data
      console.log('wines ---> ', this.wines)
    })
  }
}
