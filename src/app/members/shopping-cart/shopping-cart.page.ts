import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {Storage} from '@ionic/storage';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.page.html',
    styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
    players: Observable<any>;
    user;

    constructor(public dataService: DataService,
                public alertCtrl: AlertController,
                private storage: Storage) {
    }

    ngOnInit() {
        this.storage.get('user').then((user) => {
            console.log('Usuario obtenido con exito', user);
            this.user = user;
        });
        this.players = this.dataService.getPlayers();
    }

    async confirmPurchase(player) {
        const creditsAfterPurchase = this.user.credits - player.price;
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
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();
    }

}
