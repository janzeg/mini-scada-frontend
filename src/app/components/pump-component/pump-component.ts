import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PumpData, PumpService } from '../../services/pump-service';

@Component({
  selector: 'app-pump-component',
  standalone: false,
  templateUrl: './pump-component.html',
  styleUrl: './pump-component.css'
})
export class PumpComponent {

  @Input() name: string = 'Zbiornik';
  @Input() id: number = 0;
  active: boolean = false;
  
  private subs: Subscription[] = [];

  constructor(private pumpService: PumpService) { }

  ngOnInit(): void {

    const activeSub = this.pumpService.getPumpStream(this.id, 'Active')
      .subscribe((data: PumpData) => {
        this.active = Boolean(data.value);
    });;

    this.subs.push(activeSub);

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
