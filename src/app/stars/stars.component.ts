import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})

export class StarsComponent implements OnInit, OnChanges {
  /*声明星级评价*/
  @Input()
   private rating: number = 0;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  /*声明stars数组*/
  private stars: boolean[];
  @Input()
  private readonly :boolean = true;

  constructor() { }

  ngOnInit() {
    /*this.stars = [false, false, true, true, true];*/
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stars = [];
    for ( let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }


  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index +1;
      this.ratingChange.emit(this.rating);
    }

  }


}
