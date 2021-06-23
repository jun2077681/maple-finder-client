import {Component, OnDestroy, OnInit} from "@angular/core";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy{

  myObject: Map<string, number> = new Map<string, number>();

  ngOnInit() {
    this.myObject.set("char1", 1);
    this.myObject.set("char2", 2);
    this.myObject.set("char3", 3);
  }

  ngOnDestroy() {

  }
}
