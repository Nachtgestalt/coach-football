import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
