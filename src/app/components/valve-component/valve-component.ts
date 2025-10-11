import { Component, Input } from '@angular/core';
import { filter, Observable, Subscription } from 'rxjs';
import { WebSocketManagerService } from '../../services/web-socket-manager-service';
import { ValveData, ValveService } from '../../services/valve-service';

@Component({
  selector: 'app-valve-component',
  standalone: false,
  templateUrl: './valve-component.html',
  styleUrl: './valve-component.css'
})
export class ValveComponent {

  @Input() name: string = 'Zawór';
  @Input() id: number = 0;
  active: boolean = false;
  
  private subs: Subscription[] = [];

  constructor(private valveService: ValveService) { }

  ngOnInit(): void {

    const activeSub = this.valveService.getValveStream(this.id, 'Active')
      .subscribe((data: ValveData) => {
        this.active = Boolean(data.value);
    });;

    this.subs.push(activeSub);

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
