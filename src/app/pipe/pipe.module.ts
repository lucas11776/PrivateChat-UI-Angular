import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastSeenPipe } from './last-seen.pipe';
import { DatePipe } from './date.pipe';



@NgModule({
  declarations: [
    LastSeenPipe,
    DatePipe
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
