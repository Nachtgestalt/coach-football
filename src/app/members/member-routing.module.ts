import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {IonicRouteStrategy} from '@ionic/angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../services/token.interceptor';

const routes: Routes = [
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
    {path: 'players/:id', loadChildren: './players/players.module#PlayersPageModule'},
    {path: 'shopping-cart', loadChildren: './shopping-cart/shopping-cart.module#ShoppingCartPageModule'},
    {path: 'user/:id', loadChildren: './user-detail/user-detail.module#UserDetailPageModule'},
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class MemberRoutingModule {
}
