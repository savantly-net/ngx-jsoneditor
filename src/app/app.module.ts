import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { JsonEditorModule } from './modules/jsoneditor/jsoneditor.module';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    JsonEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('Constructed AppModule');
  }
}
