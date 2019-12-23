import { Pipe, PipeTransform } from '@angular/core';

import { DateService } from '../shared/date.service';

@Pipe({
  name: 'dateChat'
})
export class DatePipe implements PipeTransform {

  constructor(private date: DateService) { }

  transform(timestamp:string): string {
    var date = new Date(timestamp);
    const TIME = (date.getHours() > 12 ? (date.getHours()-12) + ':' + date.getMinutes() + 'pm' : (date.getHours() + ':' + date.getMinutes() + 'am'));
    
    if((date.getTime()/1000) > this.date.getTodayTimestamp()) {
      return TIME + ' Today';
    }

    if((date.getTime()/1000) > this.date.getYesterdayTimestamp()) {
      return TIME + ' Yesterday';
    }

    return TIME;
  }

}
