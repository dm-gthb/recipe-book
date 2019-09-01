import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class Dropdown {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpenClass() {
    this.isOpen = !this.isOpen;
  };
}
