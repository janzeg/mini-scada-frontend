import { Component } from '@angular/core';
import { ProcessControlService, ProcessState } from '../../services/process-control-service';
import { Router } from '@angular/router';
import { Order } from '../../model/order';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-top-bar',
  standalone: false,
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {

  processActive = false;
  processState: ProcessState = ProcessState.INIT;

  selectedOrder: Order | null = null;

  constructor(private processControlService: ProcessControlService,
              private orderService : OrderService,
              private router: Router) {}

  ngOnInit(): void {
    // Subskrypcja stanu procesu
    this.processControlService.processState$.subscribe(state => {
      this.processState = state;
      console.log('Aktualny stan procesu:', ProcessState[state]);
      this.processActive = (state > ProcessState.STANDBY && state < ProcessState.STOPPED);
    });

    // Subskrypcja wybranego zlecenia
    this.orderService.selectedOrder$.subscribe(order => {
      this.selectedOrder = order;
      console.log('Wybrane zlecenie:', order);
    });
  }

  onStartStopProcess(): void {
    if (!this.processActive) {

      if (!this.selectedOrder?.id) {
        alert('❗ Wybierz zlecenie przed startem procesu');
        return;
      }

      // start process
      this.processControlService.startProcess(this.selectedOrder.id).subscribe({
        next: () => {
          console.log('Komenda startu procesu!');
        },
        error: err => console.error('Błąd przy uruchamianiu procesu:', err)
      });

    } else {
      // stop process
      this.processControlService.stopProcess().subscribe({
        next: () => {
          this.processActive = false;
          console.log('Komenda zatrzymania procesu!');
        },
        error: err => console.error('Błąd przy zatrzymywaniu procesu:', err)
      });
    }
  }

  get processStateLabel(): string {
    return this.processStateLabels[this.processState] || 'Nieznany stan';
  }

  onShowProcessView(): void {
    this.router.navigate(['/process']); 
  }

  onShowRecipeManager(): void {
    this.router.navigate(['/recipes']); 
  }

  onShowOrderManager(): void {
    this.router.navigate(['/orders']); 
  }

  onShowAlarms(): void {
    this.router.navigate(['/alarms']); 
  }


  private processStateLabels: { [key in ProcessState]: string } = {
    [ProcessState.INIT]: 'INICJALIZACJA',
    [ProcessState.WAITING_FOR_RECIPE_SELECTION]: 'OCZEKIWANIE NA WYBÓR ZLECENIA',
    [ProcessState.STANDBY]: 'OCZEKIWANIE NA START',
    [ProcessState.FILLING_INPUT_TANKS]: 'NAPEŁNIANIE ZBIORNIKÓW WEJŚCIOWYCH',
    [ProcessState.FILLING_MIXER]: 'NAPEŁNIANIE MIESZALNIKA',
    [ProcessState.MIXING]: 'MIESZANIE',
    [ProcessState.EMPTYING_MIXER]: 'OPRÓŻNIANIE MIESZALNIKA',
    [ProcessState.CYCLE_END]: 'KONIEC CYKLU',
    [ProcessState.STOPPED]: 'PROCES WSTRZYMANY'
  };

}


