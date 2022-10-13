import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[primaryButton]'
})
export class PrimaryButtonDirective {
  @HostBinding('class') get classes() {
    return 'button button--primary';
  }
}
