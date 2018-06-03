import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: [MenuComponent]
})
export class SharedModule { }
