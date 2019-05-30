import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private URL_WISHLIST = `${environment.baseUrl}/deseados`;
  constructor(private http: HttpClient) { }

  listWishList() {
    return this.http.get(this.URL_WISHLIST).pipe(
        map((res: any) => res.response)
    );
  }

  addPlayer(id) {
    console.log(id);
    const url = `${this.URL_WISHLIST}/agregar/${id}`;
    return this.http.post(url, null);
  }
}
