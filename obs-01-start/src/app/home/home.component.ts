import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscriber, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count: number) => {
    //   console.log(count);
    // });
    const customIntervalObservable = new Observable((subscriber: Subscriber<any>) => {
      let count = 0;
      setInterval(() => {
        subscriber.next(count);
        if (count === 5) {
          subscriber.complete();
        }
        if (count > 3) {
          subscriber.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });
    let filterOperator = filter(data => {
      return data > 0;
    });
    let mapOperator = map((data: number) => {
      console.log(data);
      return 'Round: ' + (data + 1);
    });
    this.firstObsSubscription = customIntervalObservable.pipe(filterOperator, mapOperator).subscribe((data1: string) => {
      console.log(data1);
    }, (error: Error) => {
      console.log({error});
      alert(error);
    }, () => {
      console.log("Completed!");
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
