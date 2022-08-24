import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {CurrencyInt} from "./currencyInt.interface";

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService{

  public dataLoader = new BehaviorSubject(false)

  allCurrency: CurrencyInt[] = []

  constructor(private http: HttpClient) {
    this.http.get<CurrencyInt[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe(actualRate => {
        this.allCurrency = actualRate;
        this.dataLoader.next(true);
      })
  }

  getSetOfCurrency(codeArr: String []): CurrencyInt[] {
    return this.allCurrency.filter(item => codeArr.includes(item.cc));
  }

  findCurrencyRate(currencyCode: string): number {
    const currencyItem = this.allCurrency.find(item => item.cc === currencyCode);
    if (currencyItem) {
      return currencyItem.rate;
    }
    return 1;
  }
}



