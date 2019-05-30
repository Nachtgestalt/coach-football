import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  constructor(private userService: UserService,
              private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.initRegisterFormGroup();
  }

  initRegisterFormGroup() {
    this.registerForm = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  register() {
    this.userService.register(this.registerForm.value)
        .subscribe( res => {
          console.log(res);
          this.presentAlertPrompt().then();
        });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Verificar email',
      subHeader: 'Hemos enviado un código de verificación a tu email',
      inputs: [
        {
          name: 'email',
          type: 'email',
          id: 'email',
          value: this.registerForm.get('email').value || '',
          placeholder: 'Correo electronico'
        },
        {
          name: 'codigo',
          type: 'text',
          placeholder: 'Codigo de verificación'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            console.log('Data', data);
            this.userService.verifyEmail(data).subscribe( (res: any) => {
              let title = '';
              let message = '';
              console.log(res);
              if (res.ok) {
                title = 'Hemos confirmado tu correo';
                message = 'Ya puedes iniciar sesión';
                this.presentAlert(title, message).then(() => console.log('Todo bien'));
                this.router.navigateByUrl('/login');
              } else {
                title = 'Hubo un error al confirmar tu correo';
                message = 'Intentalo más tarde';
                this.presentAlert(title, message).then((response) => console.log('Todo bien', response));
              }
            },
                error => {
                  const title = 'Hubo un error al confirmar tu correo';
                  const message = 'Intentalo más tarde';
                  this.presentAlert(title, message).then((response) => console.log('Todo bien', response));
                });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }


}
