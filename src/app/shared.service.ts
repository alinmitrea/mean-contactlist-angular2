import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class SharedService {
  // Observable string sources
  private colorClass = new Subject<string>();

  // Observable string streams
  colorClass$ = this.colorClass.asObservable();

  // Service message commands
  publishData(data: string) {
    this.colorClass.next(data);
  }


  // publishData(data: string) {
  //     console.log('Inside publish data: ' + data);
  //     this.caseNumber = data;
  // }

  // subscribeData() {
  //     console.log('Inside subscribeData: ' + this.caseNumber);
  //     return this.caseNumber;
  // }
}
