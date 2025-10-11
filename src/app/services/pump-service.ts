import { Injectable } from '@angular/core';
import { WebSocketManagerService } from './web-socket-manager-service';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PumpService {
  
  private topic = '/topic/Pump/**';
  public pump$!: Observable<PumpData>;

  constructor(private wsManager: WebSocketManagerService) { 
    this.pump$ = this.wsManager.subscribeWsTopic<PumpData>(this.topic);
  }

  public getPumpStream(pumpId: number, type?: string) {
    return this.pump$.pipe(
      filter((data: PumpData) => !!data?.name),
      filter((data: PumpData) => {
        const parts = data.name.split('/');
        if (parts.length < 3) return false;
        const id = Number(parts[1]);
        const valueType = parts[2];
        return id === pumpId && (!type || valueType === type);
      })
    );
  }

}

export interface PumpData {
  name: string;
  value: boolean;
}