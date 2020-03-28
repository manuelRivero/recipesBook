import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen=false
  @HostListener('click') mouseEnter(event){
    this.isOpen= !this.isOpen
    let elemento = this.elementRef.nativeElement;
    console.log(this.renderer.nextSibling(elemento))
  }



  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    
   }


}
