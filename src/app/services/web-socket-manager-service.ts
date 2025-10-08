// import { Injectable } from '@angular/core';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketManagerService {
  
//   private client!: Client;
//   private connected = false;

//   public connect(): void {
//       if (this.connected) return; // nie łącz ponownie
  
//       const socket = new SockJS('http://localhost:8090/ws');
  
//       // Stwórz klienta STOMP
//       this.client = new Client({
//         webSocketFactory: () => socket as WebSocket,
//         reconnectDelay: 5000,
//         heartbeatIncoming: 0,
//         heartbeatOutgoing: 20000,
//       });
  
//       this.client.onConnect = (frame) => {
//         this.connected = true;
//         this.client.subscribe('/topic/Tank/**', (message: IMessage) => {
//           if (message.body) {
//             const data: TankData = JSON.parse(message.body);
//             this.tankSubject.next(data);
//           }
//         });
  
//         console.log('Connected to WebSocket', frame);
//       };
//   }
// }
