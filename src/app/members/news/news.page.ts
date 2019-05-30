import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {

  news$: Observable<any>;

  constructor(private newsService: NewsService,
              private userService: UserService) { }

  ionViewWillEnter() {
    this.news$ = this.newsService.listNews();
  }

}
