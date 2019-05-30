import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {baseUrl} from '../config/config';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {UserService} from './user.service';

const TOKEN_KEY = 'Authorization';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private URL_USERS = `${environment.baseUrl}/usuarios`;
    user = {
        credits: 2
    };

    authenticationState = new BehaviorSubject(false);
    constructor(private storage: Storage,
                private platform: Platform,
                private http: HttpClient,
                private userService: UserService) {
        this.platform.ready().then(() => {
            this.checkToken();
        });
    }

    login(payload) {
        const url = `${this.URL_USERS}/login`;
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(url, payload, {headers})
            .pipe(
                tap((res: any) => {
                    console.log(res);
                    // this.storage.set('user', this.user).then(() => console.log('Usuario guardado'));
                    this.storage.set(TOKEN_KEY, `${res.token}`).then(() => {
                        this.authenticationState.next(true);
                    });
                })
            );
    }

    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

    checkToken() {
        return this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                this.authenticationState.next(true);
            }
        });
    }


}
