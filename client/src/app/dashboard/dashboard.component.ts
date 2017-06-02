import { Component, OnInit } from '@angular/core';

import {KeeperService} from '../keeper.service';
import { Unicorn } from "app/common/unicorn.model";

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container" style="width: 90vw" >
      <div class="row" style="margin-top: 10px;" >
        <button 
          class="btn btn-default" 
          (click)="onToggleShowUnicorns()"
        >
          Watch Unicorns
        </button>
        <button
          class="btn btn-primary"
          (click)="onCreateRandomUnicorn()"
        >
          Create Random Unicorn
        </button>
      </div>
      <div *ngIf="isShow" >
        <div class="row" 
          *ngFor="let unicorn of unicorns"
        >
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

  constructor(private _keeperService: KeeperService) { }

  ngOnInit() {
    this._keeperService.getUnicorns().subscribe((data: Unicorn[]) => {
      // console.log('data ', data);
      this.unicorns = data;
      // console.log(this.unicorns);
    });
  }

  onToggleShowUnicorns() {
    this.isShow = !this.isShow;
  }

  onCreateRandomUnicorn() {
    const randomUnicorn = new Unicorn((new Date()), Math.round(Math.random() * 100));
    this._keeperService.createRandomUnicorn(randomUnicorn).subscribe((data: Unicorn[]) => {
      console.log(data);
      this.unicorns = data;
    });
  }
}
