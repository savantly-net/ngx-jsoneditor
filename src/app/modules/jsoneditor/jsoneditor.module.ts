import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonEditorComponent } from './jsoneditor.component';
export { JsonEditorComponent } from './jsoneditor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JsonEditorComponent],
  exports: [JsonEditorComponent]
})
export class JsonEditorModule { }
