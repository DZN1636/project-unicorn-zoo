import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import {KeeperService} from '../keeper.service';
import { Unicorn } from "app/common/unicorn.model";

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container" style="width: 90vw" >
      <div class="row" >
        <label>Unicorn Pick #1</label>
        <input type="number" class="form-control" placeholder="Index of any unicorn" #unicornOne />
        <label>Unicorn Pick #2</label>
        <input type="number" class="form-control" placeholder="Index of any unicorn" #unicornTwo />
        <div class="row pull-right" style="margin-top: 10px;" >
          <button 
            class="btn btn-success" 
            (click)="onToggleShowUnicorns()"
          >
            Watch Unicorns
          </button>
          <button
            class="btn btn-primary"
            (click)="onCreateUnicorn()"
          >
            Create Unicorn
          </button>
          <button
            class="btn btn-primary"
            (click)="onMate(unicornOne, unicornTwo)"
          >
            Mate
          </button>
          <button
            class="btn btn-danger"
            (click)="onDelete()"
          >
            Sell All Unicorns
          </button>
          <div *ngIf="isDeleteMode" style="margin-top: 5px;" >
            <label>Please count the number of unicorns you are having</label>
            <input placeholder="Please don't be drunk" #deleteRef >
            <button
              class="btn btn-danger btn-xs"
              (click)="onConfirmDeletion(deleteRef.value)"
            >
              Confirm Deletion
            </button>
          </div>
        </div>
      </div>

      <hr/>

      <div *ngIf="isZooEmpty()" >
        <p>The zoo is empty</p>
      </div>
      
      <div *ngIf="isShow" >
        <div class="row" 
          *ngFor="let unicorn of unicorns; let i = index"
        >
          <div class="col-xs-3" >
            <h2>{{i}}: {{unicorn.name}}</h2>
          </div>
          <div class="col-xs-3" >
            <img [src]="imgSrc" >
          </div>
          <div class="col-xs-6" >
            <unicorn [data]="unicorn" ></unicorn>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  unicorns: Unicorn[];
  isShow: boolean = false;
  imgSrc: string = 'https://github.com/images/error/angry_unicorn.png';
  isDeleteMode: boolean = false;

  constructor(private _keeperService: KeeperService) { }

  ngOnInit() {
    this._keeperService.getUnicorns().subscribe((data: Unicorn[]) => {
      this.unicorns = data;
    });
  }

  isZooEmpty(): Boolean {
    return this.unicorns && this.unicorns.length === 0;
  }

  onToggleShowUnicorns(): void {
    this.isShow = !this.isShow;
  }

  onCreateUnicorn() {
    const randomUnicorn = new Unicorn(null, Math.round(Math.random() * 100));
    this._keeperService.createUnicorn(randomUnicorn).subscribe((data: Unicorn[]) => {
      this.unicorns = data;
    });
  }

  onMate(unicornOne, unicornTwo) {
    const key1 = unicornOne.value;
    const key2 = unicornTwo.value;
    const filteredUnicorn1 = _.filter(this.unicorns, (unicornVal, unicornKey) => {
      return unicornKey === Number(key1);
    });
    const filteredUnicorn2 = _.filter(this.unicorns, (unicornVal, unicornKey) => {
      return unicornKey === Number(key2);
    });
    console.log(filteredUnicorn1, filteredUnicorn2);
    if(filteredUnicorn1.length < 1 || filteredUnicorn2.length < 1) {
      alert('I think you have entered incorrect index(es)');
    } else {
      const unicorn1_gender = filteredUnicorn1[0].gender;
      const unicorn2_gender = filteredUnicorn2[0].gender;
      if(( unicorn1_gender === 'M' && unicorn2_gender === 'F' ) || 
          ( unicorn1_gender === 'F' && unicorn2_gender === 'M' )) 
      {
        this._keeperService.makeBaby(filteredUnicorn1[0], filteredUnicorn2[0]).subscribe((data: Unicorn[]) => {
          this.unicorns = data;
        });
      } else {
        alert('You can only mate between a male unicorn and a female one');
      }
    }
  }

  onDelete() {
    this.isDeleteMode = !this.isDeleteMode;
  }

  onConfirmDeletion(deleteRefValue) {
    if(Number(deleteRefValue) !== this.unicorns.length) {
      alert('You are truly drunk');
    } else {
      this._keeperService.deleteAllUnicorns().subscribe((data: Unicorn[]) => {
        this.unicorns = data;
        console.log(this.unicorns);
        this.isDeleteMode = !this.isDeleteMode;
      });
    }
  }
}
