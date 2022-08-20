import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrencyRateService} from "../currency-rate.service";

interface CurrencyInt {
  txt: string;
  rate: number;
  cc: string;
}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})

export class ExchangeComponent implements OnInit {
  inputFromValue = ''
  inputToValue = ''
  inputFromKey = ''
  inputToKey = ''

  form!: FormGroup
  currency: CurrencyInt[] = [];

  constructor(public currencyService: CurrencyRateService) {
  }

  ngOnInit() {
    this.currencyService.dataLoader.subscribe(data => {
      if (data) {
        this.currency = this.currencyService.currency
      }
    })

    this.form = new FormGroup({
      currency: new FormGroup({
        exchangeFrom: new FormControl('UAH'),
        exchangeTo: new FormControl('USD'),
        currencyInputFrom: new FormControl('', Validators.required),
        currencyInputTo: new FormControl('', Validators.required)
      })
    })
  }

  onChangeDirect() {
  const ccMapA : any = {
    UAH: 'UAH',
    USD: 'USD',
    EUR: 'EUR'
    }

    let ccKeyA = this.form.get('currency')!.get('exchangeFrom')!.value
    let ccA = ccMapA[ccKeyA]

  const ccMapB : any = {
  UAH: 'UAH',
  USD: 'USD',
    EUR: 'EUR'
  }

    let ccKeyB = this.form.get('currency')!.get('exchangeTo')!.value
    let ccB = ccMapB[ccKeyB]

    this.form.patchValue({
      currency: {exchangeTo: ccA, exchangeFrom: ccB}
    })
  }

  onExchangeTo(cc_1: number, cc_2: number) {
    //--from UAH
    if (this.inputFromKey === 'UAH') {
      return (+this.inputFromValue / +cc_1).toFixed(2);
    }
    //--from USD
    else if (this.inputFromKey === 'USD') {
      if (this.inputToKey === 'UAH') {
        return (+this.inputFromValue * +cc_1).toFixed(2);
      } else {
        return (+this.inputFromValue * (+cc_2 / +cc_1)).toFixed(2);
      }
    }
    //--from EUR
    else if (this.inputFromKey === 'EUR') {
        if (this.inputToKey === 'UAH') {
          return (+this.inputFromValue * +cc_1).toFixed(2);
        } else {
          return (+this.inputFromValue * (+cc_1 / +cc_2)).toFixed(2);
        }
    }
    //--same currencies
    else if (this.inputFromKey === this.inputToKey) {
      return (+this.inputFromValue).toFixed(2);
    }
    else {
      console.log('Error in Exchange Function');
      return 0;
    }
  }

  exchange(){
    const ccMapA : any = {
      UAH: 'UAH',
      USD: 'USD',
      EUR: 'EUR'
    }

    let ccKeyA = this.form.get('currency')!.get('exchangeFrom')!.value
    let ccA = ccMapA[ccKeyA]
    this.inputFromKey = ccA

    const ccMapB : any = {
      UAH: 'UAH',
      USD: 'USD',
      EUR: 'EUR'
    }

    let ccKeyB = this.form.get('currency')!.get('exchangeTo')!.value
    let ccB = ccMapB[ccKeyB]
    this.inputToKey = ccB

    let usd = +this.currency[25].rate;
    let eur = +this.currency[32].rate;

    //--from UAH
    if (this.inputFromKey === 'UAH' && this.inputToKey === 'USD') {
      this.inputToValue = this.onExchangeTo(usd, eur).toString();
      // console.log(this.onExchangeTo(eur, usd));
    }
    else if (this.inputFromKey === 'UAH' && this.inputToKey === 'EUR') {
      this.inputToValue = this.onExchangeTo(eur, usd).toString();
      // console.log(this.onExchangeTo(eur, usd));
    }
    //--from USD
    else if (this.inputFromKey === 'USD' && this.inputToKey === 'UAH'){
      this.inputToValue = this.onExchangeTo(usd, eur).toString();
      // console.log(this.onExchangeTo(eur, usd));
    }
    else if (this.inputFromKey === 'USD' && this.inputToKey === 'EUR'){
      this.inputToValue = this.onExchangeTo(eur, usd).toString();
      // console.log(this.onExchangeTo(eur, usd));
    }
    //--from EUR
    else if (this.inputFromKey === 'EUR' && this.inputToKey === 'UAH'){
      this.inputToValue = this.onExchangeTo(usd, eur).toString();
      // console.log(this.onExchangeTo(eur, usd));
    }
    else if (this.inputFromKey === 'EUR' && this.inputToKey === 'USD'){
      this.inputToValue = this.onExchangeTo(eur, usd).toString();
      // console.log(this.onExchangeTo(eur, usd));
    }
    //--same currencies
    else if (this.inputFromKey === this.inputToKey){
      this.inputToValue = this.onExchangeTo(1, 1).toString();
      // console.log(this.onExchangeTo(1, 1));
    }
    else {
      return console.log('error with cc');
    }
  }

  onExchangeFrom(inputValue: Event) {
    this.inputFromValue = (<HTMLTextAreaElement>inputValue.target).value;
    this.exchange()
}

  onSubmit() {
    this.inputFromValue = ''
    this.inputToValue = ''
  }
}
