import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import { LegendComponent } from './legend/legend.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutesListComponent } from './routes/routes-list.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    MapComponent,
    LegendComponent,
    RoutesListComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
