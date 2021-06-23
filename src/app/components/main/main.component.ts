import {Component, OnDestroy, OnInit} from "@angular/core";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{

  myObject: Map<string, number> = new Map<string, number>();
  objectKeys = Object.keys;

  ngOnInit() {
    this.myObject.set("char1", 1);
    this.myObject.set("char2", 2);
    this.myObject.set("char3", 3);
  }

  ngOnDestroy() {

  }
}
