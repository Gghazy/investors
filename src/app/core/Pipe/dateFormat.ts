import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormat implements PipeTransform{
    transform(input:string) : string {
        return  input.replace('T', ' ');
    }
}