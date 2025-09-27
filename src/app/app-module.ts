import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TankComponent } from '../components/tank-component/tank-component';
import { ValveComponent } from '../components/valve-component/valve-component';
import { PumpComponent } from '../components/pump-component/pump-component';
import { MixerComponent } from '../components/mixer-component/mixer-component';
import { TankHorizontalComponent } from '../components/tank-horizontal-component/tank-horizontal-component';

@NgModule({
  declarations: [
    App,
    TankComponent,
    ValveComponent,
    PumpComponent,
    MixerComponent,
    TankHorizontalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
