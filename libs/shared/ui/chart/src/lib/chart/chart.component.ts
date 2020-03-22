import { Component, Input } from '@angular/core';

export interface ChartOptions {
  title: string;
  type: string;
  data: any;
  columnNames: string[];
  options: any;
}

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() options: ChartOptions;
  @Input() data: Array<Array<string | number>>;

  constructor() {}
}
