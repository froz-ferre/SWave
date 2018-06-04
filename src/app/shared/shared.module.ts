import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    MenuComponent,
    MenuComponent
  ],
  exports: [
    MaterialModule,
    MenuComponent,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
