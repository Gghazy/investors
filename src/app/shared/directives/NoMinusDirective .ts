import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[noMinus]'
})
export class NoMinusDirective {

    constructor(private elementRef: ElementRef) {}
  @HostListener('input', ['$event']) onInputChange(event:Event) {
    debugger
    const initialValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = initialValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (this.elementRef.nativeElement.value !== initialValue) {
      event.stopPropagation();
    }
  }

}