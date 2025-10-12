import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebSocketManagerService } from './web-socket-manager-service';

@Injectable({
  providedIn: 'root'
})
export class ProcessControlService {
  
  private baseUrl = 'http://localhost:8090/api/process';
  private processStateSubject = new BehaviorSubject<ProcessState>(ProcessState.INIT);
  public processState$ = this.processStateSubject.asObservable();

  constructor(private http: HttpClient,
              private wsManager: WebSocketManagerService) { 

    this.wsManager.subscribeWsTopic<ProcessStateData>('/topic/ProcessState')
      .subscribe({
        next: (msg) => {
          if (msg && msg.value !== undefined) {
            this.processStateSubject.next(msg.value);
            //console.log('Stan procesu:', ProcessState[msg.value]);
          }
        }
    });         
  }

  startProcess(): Observable<any> {
    return this.http.post(`${this.baseUrl}/start`, {});
  }

  stopProcess(): Observable<any> {
    return this.http.post(`${this.baseUrl}/stop`, {});
  }

}

export interface ProcessStateData {
  name: string;        // np. "ProcessState"
  value: ProcessState; // np. ProcessState.MIXING
}

export enum ProcessState {
  INIT = 0,
  WAITING_FOR_RECIPE_SELECTION = 5,
  STANDBY = 10,
  FILLING_INPUT_TANKS = 20,
  FILLING_MIXER = 30,
  MIXING = 40,
  EMPTYING_MIXER = 50,
  CYCLE_END = 60,
  STOPPED = 500
}