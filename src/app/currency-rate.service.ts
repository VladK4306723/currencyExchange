import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

interface CurrencyInt {
  txt: string;
  rate: number;
  cc: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService{

  public dataLoader = new BehaviorSubject(false)

  currency: CurrencyInt[] = []

  constructor(private http: HttpClient) {
    this.http.get<CurrencyInt[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe(actualRate => {
        this.currency = actualRate
        this.dataLoader.next(true)
      })
  }
}

