import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-players',
    templateUrl: './players.page.html',
    styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
    players: Observable<any>;
    user;

    constructor(public alertCtrl: AlertController,
                public dataService: DataService,
                private storage: Storage) {
    }

    ngOnInit() {
        this.storage.get('user').then((user) => {
            console.log('Usuario obtenido con exito', user);
            this.user = user;
        });
        this.players = this.dataService.getPlayers();
    }

    async confirmPurchase() {
        const alert = await this.alertCtrl.create({
            header: 'Agregar a deseados',
            message: '¿Desea agregar a este jugador a la lista de deseados?',
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
