import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastSeenPipe } from './last-seen.pipe';



@NgModule({
  declarations: [
    LastSeenPipe
  ],
  exports: [
    LastSeenPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
