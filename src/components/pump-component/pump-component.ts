import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pump-component',
  standalone: false,
  templateUrl: './pump-component.html',
  styleUrl: './pump-component.css'
})
export class PumpComponent {
  @Input() name: string = 'Pompa';
  @Input() state: 'ON' | 'OFF' = 'OFF';
}
