import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class TankService {

  private tankSubject = new BehaviorSubject<TankData>({ name: '', value: 0 });
  tank$ = this.tankSubject.asObservable();

  private connected = false;

  private client!: Client;

  constructor() { }

  public connect(): void {
    if (this.connected) return; // nie łącz ponownie

    const socket = new SockJS('http://localhost:8090/ws');

    // Stwórz klienta STOMP
    this.client = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
    });

    this.client.onConnect = (frame) => {
      this.connected = true;
      this.client.subscribe('/topic/Tank/**', (message: IMessage) => {
        if (message.body) {
          const data: TankData = JSON.parse(message.body);
          this.tankSubject.next(data);
        }
      });

      console.log('Connected to WebSocket', frame);
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP error:', frame.headers['message'], frame.body);
    };

    this.client.activate();
  }

  /**
   * Zwraca strumień danych tylko dla danego zbiornika (i opcjonalnie typu).
   * @param tankId numer zbiornika
   * @param type np. 'Level' lub 'Alarm'
   */
  public getTankStream(tankId: number, type?: string) {
    return this.tank$.pipe(
      filter((data: TankData) => {
        if (!data.name) return false;
        const parts = data.name.split('/');
        if (parts.length < 3) return false;

        const id = Number(parts[1]);
        const valueType = parts[2];

        return id === tankId && (!type || valueType === type);
      })
    );
  }

}


export interface TankData {
  name: string;
  value: number | boolean | string;
}