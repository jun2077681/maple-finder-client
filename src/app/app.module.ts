import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TestComponent} from './components/test/test.component';
import {MainComponent} from "./components/main/main.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchResultComponent} from "./components/search-result/search-result.component";
import {HttpClientModule} from "@angular/common/http";
import {NgbdSortableHeader} from './directive/sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MainComponent,
    SearchResultComponent,
    NgbdSortableHeader,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
