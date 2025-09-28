import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tank-horizontal-component',
  standalone: false,
  templateUrl: './tank-horizontal-component.html',
  styleUrl: './tank-horizontal-component.css'
})
export class TankHorizontalComponent {
  @Input() level: number = 50; // 0-100% wysokości
  @Input() name: string = "Zbiornik";
}
