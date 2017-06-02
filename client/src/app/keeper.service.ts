import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import {Unicorn} from './common/unicorn.model';
import 'rxjs/add/operator/map';

const UNICORNS_API: string = 'http://localhost:8080/api/unicorns';

@Injectable()
export class KeeperService {
  constructor(private _http: Http) {
    // console.log(this._http);
  }

  getUnicorns(): Observable<Unicorn[]> {
    // return [new Unicorn('first', 33), new Unicorn('second', 44)];
    const URL = `${UNICORNS_API}/get`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    return this._http.post(URL, {}, options).map((response: Response) => response.json());
  }

  createRandomUnicorn(newUnicorn: Unicorn) {
    const URL = `${UNICORNS_API}/create`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    return this._http.post(URL, {unicorn: newUnicorn}, options).map((response: Response) => response.json());
  }
}
