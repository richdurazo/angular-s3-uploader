import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule
  ],
  declarations: []
})
export class AppMaterialModule { }
