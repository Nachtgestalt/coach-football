import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_USER = `${environment.baseUrl}/usuario`;
  private URL_TEAM = `${environment.baseUrl}/equipo`;
  private URL_USERS = `${environment.baseUrl}/usuarios`;

  user = new BehaviorSubject('');

  constructor(private http: HttpClient, private storage: Storage) { }

  register(payload) {
    const url = `${this.URL_USER}/nuevo`;
    const body = payload;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, body, {headers});
  }

  verifyEmail(payload) {
    const url = `${this.URL_USERS}/verificaremail`;
    const body = payload;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, body, {headers, observe: 'response' as any});
  }

  getInfo() {
    return this.http.get(this.URL_USER).pipe(
        map((res: any) => res.response)
    );
  }

  getTeam() {
    return this.http.get(this.URL_TEAM).pipe(
        map((res: any) => res.response)
    );
  }

  getFichaje() {
    return this.http.get(`${environment.baseUrl}/fichaje`);
  }
}
