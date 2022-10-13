import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MsToTimePipe } from "./ms-to-time.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MsToTimePipe
  ],
  exports: [
    MsToTimePipe
  ]
})
export class MsToTimePipeModule { }
