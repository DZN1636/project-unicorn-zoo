import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// services
import {KeeperService} from './keeper.service';
import { UnicornComponent } from './unicorn/unicorn.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UnicornComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [KeeperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
