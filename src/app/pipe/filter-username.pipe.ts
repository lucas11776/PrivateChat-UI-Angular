import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsername'
})
export class FilterUsernamePipe implements PipeTransform {
  transform(array: Array<{'username':string}>, arg:string): Array<any> {
    return array.filter((value) => {
      return value.username.toLowerCase().indexOf(arg.toLowerCase()) !== 1;
    })
  }
}
