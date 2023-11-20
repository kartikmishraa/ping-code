import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
})
export class NumberOnlyDirective {
  constructor() {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];

    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ) {
      event.preventDefault();
    }
  }
}

/**
 * @description This custom directive allows only numbers to be read in Phone Number input fields
 */
