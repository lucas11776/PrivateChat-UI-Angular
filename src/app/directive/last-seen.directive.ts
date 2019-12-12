import { Directive } from '@angular/core';

@Directive({
  selector: '[appLastSeen]'
})
export class LastSeenDirective {

  MONTHS = [
    'january','february','march','april','may','june',
    'july','august','september','october','november','december'
  ];

  constructor() { }

}
