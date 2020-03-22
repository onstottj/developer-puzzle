import { Component, Input, OnInit } from '@angular/core';
import { PriceForList } from '../stock-list.service';

@Component({
  selector: 'coding-challenge-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {
  @Input()
  data: PriceForList[];

  constructor() {
  }

  ngOnInit() {
  }
}
