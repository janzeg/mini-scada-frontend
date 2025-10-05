import { Component, Input } from '@angular/core';
import { TankService, TankData } from '../../services/tank-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tank-component',
  standalone: false,
  templateUrl: './tank-component.html',
  styleUrl: './tank-component.css'
})
export class TankComponent {
  level: number = 50; // 0-100% wysokości
  @Input() name: string = 'Zbiornik';
  @Input() id: number = 0;

  private tankSub!: Subscription;

  constructor(private tankService: TankService) { }

  ngOnInit(): void {
    this.tankService.connect();

    this.tankSub = this.tankService.tank$.subscribe((data: TankData) => {

      console.log("New value... " + " name = " + data.name + ", value = " + data.value)

      const tankId = Number(data.name.split('/')[1]);

      if (tankId === this.id) {
        this.level = data.value;
      }
    });
  }

  ngOnDestroy(): void {
    this.tankSub.unsubscribe();
  }
}
