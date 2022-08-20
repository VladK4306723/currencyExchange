import {Component, OnInit} from '@angular/core';
import {CurrencyRateService} from "../currency-rate.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currency: any[] = [];

  constructor(private currencyService: CurrencyRateService) {

  }


  ngOnInit() {
    this.currencyService.dataLoader.subscribe(data => {
      if (data) {
        this.currency = this.currencyService.currency
      }
    })
  }
}
