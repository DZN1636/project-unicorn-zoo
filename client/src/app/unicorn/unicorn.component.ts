import { Component, Input } from '@angular/core';

import {Unicorn} from '../common/unicorn.model';

@Component({
  selector: 'unicorn',
  template: `
    <div class="row" style="margin-top: 5px;" >
      <h1>{{unicorn.name}}</h1>
      <ul class="list-group" >
        <li class="list-group-item" >Color: {{unicorn.color}}</li>
        <li class="list-group-item" >Age: {{unicorn.age}}</li>
        <li class="list-group-item" >Gender: {{unicorn.gender}}</li>
      </ul>
    </div>
  `,
  styleUrls: ['./unicorn.component.css']
})
export class UnicornComponent {
  @Input('data') unicorn: Unicorn;
}
