import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { WebSocketManagerService } from './web-socket-manager-service';

@Injectable({
  providedIn: 'root'
})
export class MixerService {
  
private topic = '/topic/Mixer/**';
  public mixer$!: Observable<MixerData>;

  constructor(private wsManager: WebSocketManagerService) { 
    this.mixer$ = this.wsManager.subscribeWsTopic<MixerData>(this.topic);
  }

  public getMixerStream(mixerId: number, type?: string) {
    return this.mixer$.pipe(
      filter((data: MixerData) => !!data?.name),
      filter((data: MixerData) => {
        const parts = data.name.split('/');
        if (parts.length < 3) return false;
        const id = Number(parts[1]);
        const valueType = parts[2];
        return id === mixerId && (!type || valueType === type);
      })
    );
  }

}


export interface MixerData {
  name: string;
  active: boolean;
  value: number | boolean | string;
}
