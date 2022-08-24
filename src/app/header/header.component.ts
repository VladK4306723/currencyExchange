import {Component, OnInit} from '@angular/core';
import {CurrencyRateService} from "../currency-rate.service";
import {CurrencyInt} from "../currencyInt.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  readonly currencyCodeArr: String[] = [
    'USD',
    'EUR'
  ]
  currency: CurrencyInt[] = [];

  constructor(private currencyService: CurrencyRateService) {}


  ngOnInit() {
    this.currencyService.dataLoader.subscribe(data => {
      if (data) {
        this.currency = this.currencyService.getSetOfCurrency(this.currencyCodeArr);
      }
    });
  }
}
