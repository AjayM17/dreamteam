import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
  standalone: false
})
export class CustomPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

@Pipe({
  name: 'hs',
  standalone: false
})
export class HighScore implements PipeTransform {

  transform(value: any): any {
    const runs =  this.pluckData(value.stats, 'runs')
    const wickets =  this.pluckData(value.stats, 'wickets')
    const stats = {
      batting: runs.length ,
      hr: runs.length != 0 ? Math.max(...runs) : '',
      runs_frequency: this.countGreaterThan24(runs),
      bowling:wickets.length,
      hw: wickets.length != 0 ? Math.max(...wickets) : '',
      wicktet_frequency: this.countGreaterThan1(wickets)
    }
    return stats
  }

   countGreaterThan24(array: string[]): number {
    let count = 0;
    for (const element of array) {
      if (parseInt(element) > 0) {
        count++;
      }
    }
    return count;
  }

  
  pluckData(arr:any[],key:any){
    return arr.map(item => item[key]).filter( item =>item?.trim() !='')
  }

  countGreaterThan1(array: string[]): number {
    let count = 0;
    for (const element of array) {
      if (parseInt(element) > 0) {
        count++;
      }
    }
    return count;
  }
}
