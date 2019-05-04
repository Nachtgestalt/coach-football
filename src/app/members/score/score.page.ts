import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  users: Observable<any>;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.users = this.dataService.getUsers();
  }

}
