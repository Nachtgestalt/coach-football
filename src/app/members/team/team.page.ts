import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {AlertController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {UserService} from '../../services/user.service';
import {LineupService} from '../../services/lineup.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage {

  players: Observable<any>;
  user;
  constructor(public dataService: DataService,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              private storage: Storage,
              private userService: UserService,
              private lineupSerice: LineupService) { }

  ionViewWillEnter() {
    this.players = this.userService.getTeam();
    this.userService.getInfo().subscribe(res => this.user = res);
  }

  async sellPlayer(player) {
    const creditsAfterSell = +this.user.creditos + +player.precio;
    const alert = await this.alertCtrl.create({
      header: '¿Deseas vender este jugador?',
      message: `Creditos despues de la venta: ${creditsAfterSell}`,
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
            this.lineupSerice.sellPlayer(player.jugadorId).subscribe(
                (res: any) => {
                  this.presentToast(res.response).then(() => console.log('Todo bien'));
                  this.players = this.userService.getTeam();
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
      duration: 1000
    });
    toast.present();
  }

}
