import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { ISubscription, Subscription } from 'rxjs/Subscription';

import { CoinService } from './coin.service';
import { BaseCoin } from '../coins/basecoin';

@Injectable()
export class PriceService {

  price = new BehaviorSubject<number>(null);

  private readonly updatePeriod = 10 * 60 * 1000;
  private priceTickerId: string | null = null;
  private lastPriceSubscription: ISubscription;
  private timerSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private coinService: CoinService
  ) {
    this.coinService.currentCoin.subscribe((coin: BaseCoin) => {
      this.priceTickerId = coin.priceTickerId;
      this.startTimer();
    });
  }

  private startTimer(firstConnectionDelay = 0) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.ngZone.runOutsideAngular(() => {
      this.timerSubscription = Observable.timer(this.updatePeriod, this.updatePeriod)
        .subscribe(() => this.ngZone.run(() => !this.lastPriceSubscription ? this.loadPrice() : null ));
    });

    this.timerSubscription.add(
      Observable.of(1).delay(firstConnectionDelay).subscribe(() => this.loadPrice())
    );
  }

  private loadPrice() {
    if (!this.priceTickerId) {
      return;
    }

    if (this.lastPriceSubscription) {
      this.lastPriceSubscription.unsubscribe();
    }

    this.lastPriceSubscription = this.http.get(`https://api.coinpaprika.com/v1/tickers/${this.priceTickerId}?quotes=USD`)
      .subscribe((response: any) => {
        this.lastPriceSubscription = null;
        this.price.next(response.quotes.USD.price);
      },
      () => this.startTimer(60000));
  }
}
