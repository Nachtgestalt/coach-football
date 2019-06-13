import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {Storage} from '@ionic/storage';
import {AlertController, ToastController} from '@ionic/angular';
import {WishlistService} from '../../services/wishlist.service';
import {UserService} from '../../services/user.service';
import {LineupService} from '../../services/lineup.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.page.html',
    styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
    players: Observable<any>;
    user;

    constructor(public dataService: DataService,
                public toastCtrl: ToastController,
                public alertCtrl: AlertController,
                private storage: Storage,
                private userService: UserService,
                private wishlistService: WishlistService,
                private lineupService: LineupService) {
    }

    ngOnInit() {
        this.userService.getInfo().subscribe(res => this.user = res);
        this.players = this.wishlistService.listWishList();
    }

    async confirmPurchase(player) {
        const creditsAfterPurchase = this.user.creditos - player.precio;
        const alert = await this.alertCtrl.create({
            header: '¿Desea comprar a este jugador?',
            message: `Creditos despues de la compra: ${creditsAfterPurchase}`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Confirmar',
                    handler: () => {
                        this.lineupService.buyPlayer(player.jugadorId).subscribe((res: any) => {
                                this.players = this.wishlistService.listWishList();
                                this.presentToast(res.response).then(() => console.log('Todo bien'));
                            },
                            error => {
                                console.log(error.error);
                                this.presentToast(error.error.error).then(() => console.log('Todo bien'));
                            });
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentToast(message) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 1000
        });
        toast.present();
    }

    async delete(player) {
        const alert = await this.alertCtrl.create({
            header: 'Eliminar jugador',
            message: `¿Desea eliminar a este jugador de la lista deseados?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Confirmar',
                    handler: () => {
                        this.wishlistService.deletePlayer(player.jugadorId).subscribe((res: any) => {
                                this.players = this.wishlistService.listWishList();
                                this.presentToast(res.response).then(() => console.log('Todo bien'));
                            },
                            error => {
                                console.log(error.error);
                                this.presentToast(error.error.error).then(() => console.log('Todo bien'));
                            });
                    }
                }
            ]
        });

        await alert.present();
    }

}
