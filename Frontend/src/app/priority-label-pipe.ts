import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityLabel',
  standalone: true
})
export class PriorityLabelPipe implements PipeTransform {
  transform(value: number, uppercase?: boolean): string {
    let label = '';

    switch (value) {
      case 1:
        label = 'Low';
        break;
      case 2:
        label = 'Medium';
        break;
      case 3:
        label = 'High';
        break;
      case 4:
        label = 'Unknown';
    }

    if (uppercase) {
      return label.toUpperCase();
    } else {
      return label;
    }
  }
}
