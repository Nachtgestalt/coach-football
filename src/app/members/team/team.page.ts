import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  players: Observable<any>;
  user;
  constructor(public dataService: DataService,
              public alertCtrl: AlertController,
              private storage: Storage) { }

  ngOnInit() {
    this.storage.get('user').then((user) => {
      console.log('Usuario obtenido con exito', user);
      this.user = user;
    });
    this.players = this.dataService.getPlayers();
  }

  async sellPlayer(player) {
    const creditsAfterSell = this.user.credits + player.price;
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
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
