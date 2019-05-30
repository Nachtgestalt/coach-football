import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DashboardPage} from './dashboard.page';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../../services/token.interceptor';

const routes: Routes = [
    {
        path: '',
        component: DashboardPage,
        children: [
            {path: '', redirectTo: 'news'},
            {path: 'news', loadChildren: '../news/news.module#NewsPageModule'},
            {path: 'team', loadChildren: '../team/team.module#TeamPageModule'},
            {path: 'lineup', loadChildren: '../lineup/lineup.module#LineupPageModule'},
            {path: 'score', loadChildren: '../score/score.module#ScorePageModule'},
            {path: 'bet', loadChildren: '../bet/bet.module#BetPageModule'},
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DashboardPage]
})
export class DashboardPageModule {
}
