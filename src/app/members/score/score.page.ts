import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {BetService} from '../../services/bet.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  users: Observable<any>;

  constructor(public dataService: DataService,
              private betService: BetService) { }

  ngOnInit() {
    this.betService.listScore().subscribe(res => console.log(res));
    this.users = this.dataService.getUsers();
  }

}
