import {
  Component,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ChartOptions } from '../chart-options';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() options: ChartOptions;
  @Input() data$: Observable<Array<Array<string | number>>>;

  constructor() {}

}
