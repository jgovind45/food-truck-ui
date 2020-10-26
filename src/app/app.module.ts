import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
        apiKey:"AIzaSyAr8FIqhBgOSxt5rxVbcNrU6fMVZ_jzjtw"
      }),
    AppRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
