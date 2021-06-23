import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './components/test/test.component';
import {MainComponent} from "./components/main/main.component";
import {FormsModule} from "@angular/forms";
import {SearchResultComponent} from "./components/search-result/search-result.component";

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MainComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
