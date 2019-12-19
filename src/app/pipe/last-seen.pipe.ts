import { Pipe, PipeTransform } from '@angular/core';

import { DateService } from '../shared/date.service';

@Pipe({
  name: 'lastSeen'
})
export class LastSeenPipe implements PipeTransform {

  constructor(private date: DateService) {}

  transform(value: number): string {
    return String(this.date.lastSeen(value));
  }

}
