import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsvcService } from '../services/httpsvc.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent implements OnInit {

  wine
  // wine: {
  //   description: string,
  //   points: number,
  // }
  // country: string
  description: string = ''

  constructor(private httpSvc: HttpsvcService,
              private activatedRoute: ActivatedRoute,
              private _location: Location,
              ) { }

  ngOnInit(): void {
    const w = this.activatedRoute.snapshot.params['w']
    console.log('params --->', w)
    this.getDetails(w)
  }

  getDetails(id) {
    this.httpSvc.getWineDetail(id)
    .subscribe(data => {
      this.wine = data[0]
      //this.description = this.wine['description']
      console.log('wine detail ---> ', this.wine)
    })
  }

  backClicked() {
    this._location.back()
  }
}
