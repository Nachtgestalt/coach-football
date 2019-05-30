import {Component, OnInit} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {Storage} from '@ionic/storage';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {LineupService} from '../../services/lineup.service';
import {WishlistService} from '../../services/wishlist.service';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.page.html',
    styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
    players: Observable<any>;
    user;

    constructor(public alertCtrl: AlertController,
                public toastCtrl: ToastController,
                private storage: Storage,
                private route: ActivatedRoute,
                private userService: UserService,
                private lineupService: LineupService,
                private wishListService: WishlistService) {
    }

    ngOnInit() {
        this.players = this.route.paramMap.pipe(
            switchMap(params => {
                const id = +params.get('id');
                return this.lineupService.getPlayers(id);
            })
        );
        this.userService.getInfo().subscribe(user => this.user = user);
        // this.players = this.dataService.getPlayers();
    }

    async confirmPurchase(player) {
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
                        this.wishListService.addPlayer(player.jugadorId)
                            .subscribe(
                                (res: any) => {
                                    this.presentToast(res.response).then(() => console.log('Todo bien'));
                                },
                                error => {
                                    console.log(error);
                                    this.presentToast(error.error.error);
                                }
                            );
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentToast(message) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
