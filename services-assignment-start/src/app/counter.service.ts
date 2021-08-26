import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService {
  activeToInactiveCounter = 0;
  inActiveToActiveCounter = 0;

  incrementActiveToInActiveCounter() {
    this.activeToInactiveCounter++;
    console.log(this.activeToInactiveCounter);
  }

  incrementInActiveToActiveCounter() {
    this.inActiveToActiveCounter++;
    console.log(this.inActiveToActiveCounter);
  }
}
