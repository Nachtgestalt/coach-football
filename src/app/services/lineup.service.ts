import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LineupService {

  private URL_LINEUP = `${environment.baseUrl}/fichaje`;

  constructor(private http: HttpClient) { }

  listLineups() {
    return this.http.get(this.URL_LINEUP).pipe(
        map( (response: any) => response.response)
    );
  }

  getPlayers(id) {
    const url = `${this.URL_LINEUP}/equipo/${id}`;
    return this.http.get(url).pipe(
        map((response: any) => response.response)
    );
  }

  buyPlayer(id) {
    const url = `${this.URL_LINEUP}/ficharjugador/${id}`;
    return this.http.post(url, null);
  }

  sellPlayer(id) {
    const url = `${this.URL_LINEUP}/venderjugador/${id}`;
    return this.http.post(url, null);
  }
}
