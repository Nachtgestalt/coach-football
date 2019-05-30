import { Component, OnInit } from '@angular/core';
import {BetService} from '../../services/bet.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.page.html',
  styleUrls: ['./bet.page.scss'],
})
export class BetPage {

  bets: Observable<any>;
  constructor(private betService: BetService) {
  }

  ionViewWillEnter() {
    this.bets = this.betService.listBets();
  }

  addBet() {
    this.betService.addBet(2, 1000).subscribe(res => console.log(res));
  }

}
