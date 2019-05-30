import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  private URL_BET = `${environment.baseUrl}/apuesta`;
  private URL_SCORE = `${environment.baseUrl}/puntuacion`;
  constructor(private http: HttpClient) { }

  listScore() {
    return this.http.get(this.URL_SCORE).pipe(
        map((res: any) => res.response)
    );
  }

  listBets() {
    return this.http.get(this.URL_BET).pipe(
        map((res: any) => res.response)
    );
  }

  addBet(id, bet) {
    const url = `${this.URL_BET}/participar`;
    const apuesta = {
      apuestaId: 2,
      apuestaMonto: 1000
    };
    return this.http.post(url, apuesta);

  }
}
