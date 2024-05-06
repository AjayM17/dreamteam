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
    const runs =  value['score'].trim() != '' ?  value['score'].split(",").map(Number) :[] 
    const wickets =  value['wickets'].trim() != '' ?  value['wickets'].split(",").map(Number) : []
    const stats = {
      batting:runs.length,
      hr: Math.max(...runs),
      runs_frequency: this.countGreaterThan24(runs),
      bowling:wickets.length,
      hw:Math.max(...wickets),
      wicktet_frequency: this.countGreaterThan1(wickets)
    }
    console.log(stats)
    return stats
  }

   countGreaterThan24(array: string[]): number {
    let count = 0;
    for (const element of array) {
      if (parseInt(element) > 24) {
        count++;
      }
    }
    return count;
  }

  countGreaterThan1(array: string[]): number {
    let count = 0;
    for (const element of array) {
      if (parseInt(element) > 1) {
        count++;
      }
    }
    return count;
  }
}
