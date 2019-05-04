import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) {
    }

    getPlayers() {
        return this.http.get('/assets/data/players.json');
    }

    getUsers() {
        return this.http.get('/assets/data/users.json');
    }
}
