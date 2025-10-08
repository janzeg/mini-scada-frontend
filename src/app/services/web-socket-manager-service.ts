import { Injectable } from "@angular/core";
import { Client, IMessage } from "@stomp/stompjs";
import { BehaviorSubject, Observable } from "rxjs";
import SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class WebSocketManagerService {
  private client!: Client;
  private subjects = new Map<string, BehaviorSubject<any>>();

  private connectedSubject = new BehaviorSubject<boolean>(false);
  public connected$ = this.connectedSubject.asObservable();

  constructor() {
    this.connect();
  }

  public connect(): void {
    if (this.connectedSubject.value) return;

    const socket = new SockJS('http://localhost:8090/ws');

    this.client = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
    });

    this.client.onConnect = () => {
      this.connectedSubject.next(true);
      console.log('Connected to WebSocket');

      // Subskrypcja wszystkich wcześniej dodanych tematów
      this.subjects.forEach((subject, topic) => {
        this.client.subscribe(topic, (msg: IMessage) => {
          if (msg.body) subject.next(JSON.parse(msg.body));
        });
      });
    };

    this.client.activate();
  }

  public subscribeWsTopic<T>(topic: string): Observable<T> {
    // Dodanie tematu i typu do mapy 
    if (!this.subjects.has(topic)) {
      this.subjects.set(topic, new BehaviorSubject<T | null>(null));
    }

    // Jeśli jest już połączenie, to subskrybuj natychmiast
    if (this.connectedSubject.value) {
      this.client.subscribe(topic, (msg: IMessage) => {
        if (msg.body) this.subjects.get(topic)!.next(JSON.parse(msg.body));
      });
    }

    return this.subjects.get(topic)!.asObservable() as Observable<T>;
  }
}
