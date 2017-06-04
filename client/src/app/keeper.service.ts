import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import {Unicorn} from './common/unicorn.model';
import 'rxjs/add/operator/map';

@Injectable()
export class KeeperService {
  constructor(private _http: Http) { }

  getUnicorns(): Unicorn[] {
    if(!this.isLocalStorageAvailableTest()) {
      alert('Your browser doesnt have local storage enabled. The app will misbehave.');
      return [];
    } else {
      const unicorns = localStorage.getItem('unicorns');
      const unicornsObject = JSON.parse(unicorns);
      if(!unicornsObject || unicornsObject.length === 0) { // doesnt exist because this is the 1st time, or it's empty
        localStorage.setItem('unicorns', JSON.stringify([new Unicorn('default unicorn', 33)]));
      }
      const res = localStorage.getItem('unicorns');
      console.log('final', res);
      return JSON.parse(res);
    }
  }

  /**
   * Add the unicorn in the function parameter in the local storage, then return 
   * a copy of the updated zoo of unicorns. 
   * 
   * @param {Unicorn} newUnicorn 
   * @returns {Unicorn[]} 
   * 
   * @memberof KeeperService
   */
  createUnicorn(newUnicorn: Unicorn): Unicorn[] {
    const unicorns = localStorage.getItem('unicorns');
    const unicornsObject = JSON.parse(unicorns);
    unicornsObject.push(newUnicorn);
    localStorage.setItem('unicorns', JSON.stringify(unicornsObject));
    return unicornsObject;
  }

  makeBaby(unicorn1: Unicorn, unicorn2: Unicorn): Unicorn[] {
    const babyUnicornName = `${unicorn1.name} ${unicorn2.name}`;
    // take the Red (first 3 characters from the first unicorn (including the hash)), and mix with the 
    // remaining characters from the second unicorn (aka. G and B) 
    const babyUnicornColor = unicorn1.color.substring(0, 3) + unicorn2.color.substring(3);
    const babyUnicorn = new Unicorn(babyUnicornName, 1, babyUnicornColor);
    return this.createUnicorn(babyUnicorn);
  }

  deleteAllUnicorns(): Unicorn[] {
    localStorage.setItem('unicorns', JSON.stringify([]));
    return [];
  }

  // local storage

  storageAvailable(type) {
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }

  isLocalStorageAvailableTest() {
    return this.storageAvailable('localStorage');
  }
}
