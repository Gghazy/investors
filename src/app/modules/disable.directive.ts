import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';


  
 //see I use "disable" instead of "disabled"
 @Directive({
  selector: '[disable]',
})
export class DisableDirective implements AfterViewInit {
  _disable=false
  @Input('disable') set _(value:boolean)
  {
    this._disable=value;
    this.ngAfterViewInit();
    
  }
  constructor(private elementRef:ElementRef) { }
  ngAfterViewInit()
  {
    if (this._disable)
    this.elementRef.nativeElement.setAttribute('disabled','true')
    else
    this.elementRef.nativeElement.removeAttribute('disabled')
  }
}
