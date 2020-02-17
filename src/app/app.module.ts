import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';   
import {MenuItem} from 'primeng/api'; 
import {SliderModule} from 'primeng/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import { TableComponent } from './table/table.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AccordionModule,
    SliderModule,
    ButtonModule,
    AutoCompleteModule,
    CalendarModule,
    CardModule,
    InputTextModule,
    TableModule,
    ProgressSpinnerModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
