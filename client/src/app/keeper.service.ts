import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import {Unicorn} from './common/unicorn.model';
import 'rxjs/add/operator/map';

const UNICORNS_API: string = 'http://localhost:8080/api/unicorns';

@Injectable()
export class KeeperService {
  constructor(private _http: Http) {
  }

  getUnicorns(): Observable<Unicorn[]> {
    const URL = `${UNICORNS_API}/get`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    return this._http.post(URL, {}, options).map((response: Response) => response.json());
  }

  createUnicorn(newUnicorn: Unicorn): Observable<Unicorn[]> {
    const URL = `${UNICORNS_API}/create`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    return this._http.post(URL, {unicorn: newUnicorn}, options).map((response: Response) => response.json());
  }

  makeBaby(unicorn1: Unicorn, unicorn2: Unicorn): Observable<Unicorn[]> {
    console.log(unicorn1, unicorn2);
    const babyUnicornName = unicorn1.name + ' - ' + unicorn2.name;
    // take the first 3 characters from the first unicorn (including the hash), and mix with the 
    // remaining characters from the second unicorn 
    const babyUnicornColor = unicorn1.color.substring(0, 3) + unicorn2.color.substring(3);
    const babyUnicorn = new Unicorn(babyUnicornName, 1, babyUnicornColor);
    return this.createUnicorn(babyUnicorn);
  }
}
