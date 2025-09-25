import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-valve-component',
  standalone: false,
  templateUrl: './valve-component.html',
  styleUrl: './valve-component.css'
})
export class ValveComponent {
  @Input() name: string = 'Zawór';
  @Input() state: 'OPEN' | 'CLOSED' = 'CLOSED';
}
