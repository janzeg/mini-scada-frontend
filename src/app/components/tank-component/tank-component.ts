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

  @Input() name: string = 'Zbiornik';
  @Input() id: number = 0;
  @Input() maxLevel: number = 1000;
  level: number = 0;
  levelPercent: number = 0;
  alarm: boolean = false;
  
  private subs: Subscription[] = [];

  constructor(private tankService: TankService) { }

  ngOnInit(): void {

    const levelSub = this.tankService.getTankStream(this.id, 'Level')
      .subscribe((data: TankData) => {
        this.level = Number(data.value);
        this.levelPercent = (this.level / this.maxLevel) * 100;
      });

    const alarmSub = this.tankService.getTankStream(this.id, 'Alarm')
      .subscribe((data: TankData) => {
        this.alarm = Boolean(data.value);
      });

    this.subs.push(levelSub, alarmSub);

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
