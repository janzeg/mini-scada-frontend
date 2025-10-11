import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { WebSocketManagerService } from './web-socket-manager-service';

@Injectable({
  providedIn: 'root'
})
export class ValveService {
  
private topic = '/topic/Valve/**';
  public valve$!: Observable<ValveData>;

  constructor(private wsManager: WebSocketManagerService) { 
    this.valve$ = this.wsManager.subscribeWsTopic<ValveData>(this.topic);
  }

  public getValveStream(valveId: number, type?: string) {
    return this.valve$.pipe(
      filter((data: ValveData) => !!data?.name),
      filter((data: ValveData) => {
        const parts = data.name.split('/');
        if (parts.length < 3) return false;
        const id = Number(parts[1]);
        const valueType = parts[2];
        return id === valveId && (!type || valueType === type);
      })
    );
  }

}

export interface ValveData {
  name: string;
  value: boolean;
}
