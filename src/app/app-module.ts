import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TankComponent } from './components/tank-component/tank-component';
import { ValveComponent } from './components/valve-component/valve-component';
import { PumpComponent } from './components/pump-component/pump-component';
import { MixerComponent } from './components/mixer-component/mixer-component';
import { TopBar } from './components/top-bar/top-bar';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    TankComponent,
    ValveComponent,
    PumpComponent,
    MixerComponent,
    TopBar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
