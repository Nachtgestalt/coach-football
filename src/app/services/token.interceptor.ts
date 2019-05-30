import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private storage: Storage,  private alertCtrl: AlertController) {
    }

    // Adds the token to your headers if it exists
    private static addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }

        return request;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        const promise = this.storage.get('Authorization');

        return from(promise)
            .pipe(
                mergeMap(token => {
                    const clonedReq = TokenInterceptor.addToken(request, token);
                    return next.handle(clonedReq).pipe(
                        catchError(error => {
                            // Perhaps display an error for specific status codes here already?
                            const msg = error.message;
                            // this.presentAlert(error.name, error.messaage).then(() => console.log('Todo bienn'));

                            // Pass the error to the caller of the function
                            return throwError(error);
                        })
                    );
                })
            );
    }

    // async presentAlert(header, message) {
    //     const alert = this.alertCtrl.create({
    //         header,
    //         message,
    //         buttons: ['OK']
    //     });
    //
    //     await alert.present();
    // }
}
