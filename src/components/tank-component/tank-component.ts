import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tank-component',
  standalone: false,
  templateUrl: './tank-component.html',
  styleUrl: './tank-component.css'
})
export class TankComponent {
  level: number = 50; // 0-100% wysokości
  @Input() name: string = 'Zbiornik';
}
