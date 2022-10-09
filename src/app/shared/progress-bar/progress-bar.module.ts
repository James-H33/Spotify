import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSliderModule } from "@angular/material/slider";
import { ProgressBarComponent } from "./progress-bar.component";

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule
  ],
  declarations: [
    ProgressBarComponent
  ],
  exports: [
    ProgressBarComponent
  ]
})
export class ProgressBarModule {}
