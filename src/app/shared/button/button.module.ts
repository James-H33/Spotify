import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimaryButtonDirective } from './primary-button.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PrimaryButtonDirective
  ],
  exports: [
    PrimaryButtonDirective
  ]
})
export class ButtonModule { }
