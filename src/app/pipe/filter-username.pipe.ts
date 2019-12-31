import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsername'
})
export class FilterUsernamePipe implements PipeTransform {
  transform(array: any, arg:string): Array<any> {
    if(arg == undefined) arg = '';
    return array.filter((value) => {
      return String(value.username).indexOf(arg.toLowerCase()) !== -1;
    })
  }
}
