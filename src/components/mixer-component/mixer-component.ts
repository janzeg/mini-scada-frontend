import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mixer-component',
  standalone: false,
  templateUrl: './mixer-component.html',
  styleUrl: './mixer-component.css'
})
export class MixerComponent {
  @Input() name: string = 'Mieszalnik';
  @Input() state: 'ON' | 'OFF' = 'OFF';
  level: number = 50; // 0-100% wysokości
}
