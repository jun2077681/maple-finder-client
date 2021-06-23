import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TestComponent } from './components/test/test.component';
import {SearchResultComponent} from "./components/search-result/search-result.component";

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'result',
    component: SearchResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
