import { Component, Input } from '@angular/core';
import { MixerService, MixerData } from '../../services/mixer-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mixer-component',
  standalone: false,
  templateUrl: './mixer-component.html',
  styleUrl: './mixer-component.css'
})
export class MixerComponent { 

  @Input() name: string = 'Mieszalnik';
  @Input() id: number = 0;
  @Input() maxLevel: number = 1000;
  level: number = 0;
  active: boolean = false;
  levelPercent: number = 0;
  alarm: boolean = false;
  
  private subs: Subscription[] = [];

  constructor(private mixerService: MixerService) { }

  ngOnInit(): void {

    const levelSub = this.mixerService.getMixerStream(this.id, 'Level')
      .subscribe((data: MixerData) => {
        this.level = Number(data.value);
        this.levelPercent = (this.level / this.maxLevel) * 100;
      });

    const alarmSub = this.mixerService.getMixerStream(this.id, 'Alarm')
      .subscribe((data: MixerData) => {
        this.alarm = Boolean(data.value);
    });

    const activeSub = this.mixerService.getMixerStream(this.id, 'Active')
      .subscribe((data: MixerData) => {
        this.active = Boolean(data.value);
    });

    this.subs.push(levelSub, alarmSub, activeSub);

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
