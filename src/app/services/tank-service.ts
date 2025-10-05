import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class TankService {

  private tankSubject = new BehaviorSubject<TankData>({ name: '', value: 0 });
  tank$ = this.tankSubject.asObservable();

  private client!: Client;

  constructor() { }

  public connect(): void {
    const socket = new SockJS('http://localhost:8090/ws');

    // Stwórz klienta STOMP
    this.client = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
    });

    this.client.onConnect = (frame) => {
      console.log('Connected to WebSocket', frame);

      this.client.subscribe('/topic/Tank/**', (message: IMessage) => {
        if (message.body) {
          const data: TankData = JSON.parse(message.body);
          this.tankSubject.next(data);
        }
      });
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP error:', frame.headers['message'], frame.body);
    };

    this.client.activate();
  }

}


export interface TankData {
  name: string;
  value: number;
}