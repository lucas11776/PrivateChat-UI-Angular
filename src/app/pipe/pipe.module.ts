import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastSeenPipe } from './last-seen.pipe';
import { DatePipe } from './date.pipe';
import { FilterUsernamePipe } from './filter-username.pipe';



@NgModule({
  declarations: [
    LastSeenPipe,
    DatePipe,
    FilterUsernamePipe
  ],
  exports: [
    LastSeenPipe,
    DatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
