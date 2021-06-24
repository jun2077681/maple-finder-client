import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";
import {Character} from "../../types/Character";
import {Inventory, InventoryType} from "../../types/Item";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  myCharacter: Character[] = [];
  inventory: Inventory = new Map();
  inventory$: Observable<Inventory>;

  filter = new FormControl('');

  constructor(private router: Router,
              private searchService: SearchService) {
    this.inventory$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.searchService.filterItem(text, this.inventory))
    )
  }

  ngOnInit() {
    this.myCharacter = this.searchService.getCharacters();
    if (this.myCharacter.length > 0) {
      this.searchService.getPostResult(this.myCharacter)
        .subscribe(result => {
          this.inventory.set("장비", result.equip);
          this.inventory.set("소비", result.use);
          this.inventory.set("설치", result["set-up"]);
          this.inventory.set("기타", result.etc);
          this.inventory.set("캐시", result.cash);
        });
    }
  }

  ngOnDestroy() {
  }
}
