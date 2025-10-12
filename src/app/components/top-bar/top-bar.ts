import { Component } from '@angular/core';
import { ProcessControlService, ProcessState } from '../../services/process-control-service';

@Component({
  selector: 'app-top-bar',
  standalone: false,
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {

  processActive = false;
  processState: ProcessState = ProcessState.INIT;

  constructor(private processControlService: ProcessControlService) {}

  ngOnInit(): void {
    // Subskrypcja stanu procesu
    this.processControlService.processState$.subscribe(state => {
      this.processState = state;
      console.log('Aktualny stan procesu:', ProcessState[state]);
      this.processActive = (state > ProcessState.WAITING_FOR_RECIPE_SELECTION && state < ProcessState.STOPPED);
    });
  }

  startStopProcess(): void {
    if (!this.processActive) {
      // start process
      this.processControlService.startProcess().subscribe({
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


  private processStateLabels: { [key in ProcessState]: string } = {
    [ProcessState.INIT]: 'INICJALIZACJA',
    [ProcessState.WAITING_FOR_RECIPE_SELECTION]: 'OCZEKIWANIE NA WYBÓR RECEPTURY',
    [ProcessState.STANDBY]: 'OCZEKIWANIE NA START',
    [ProcessState.FILLING_INPUT_TANKS]: 'NAPEŁNIANIE ZBIORNIKÓW WEJŚCIOWYCH',
    [ProcessState.FILLING_MIXER]: 'NAPEŁNIANIE MIESZALNIKA',
    [ProcessState.MIXING]: 'MIESZANIE',
    [ProcessState.EMPTYING_MIXER]: 'OPRÓŻNIANIE MIESZALNIKA',
    [ProcessState.CYCLE_END]: 'KONIEC CYKLU',
    [ProcessState.STOPPED]: 'PROCES WSTRZYMANY'
  };

}


