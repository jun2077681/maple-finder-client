import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from "@angular/core";
import {SearchService} from "../../services/search.service";
import {Character} from "../../types/Character";
import {InventoryType, InventoryTypeEnum, Item} from "../../types/Item";
import {Observable} from "rxjs";
import {NgbdSortableHeader, SortEvent} from "../../directive/sortable.directive";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  myCharacter: Character[] = [];
  inventory$: Observable<Item[]>;
  active: InventoryType = "equip";
  inventoryType: InventoryType[] = ["equip", "use", "setup", "etc", "cash"];
  inventoryTypeEnum = InventoryTypeEnum;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> = new QueryList<NgbdSortableHeader>();

  constructor(public searchService: SearchService) {
    this.inventory$ = searchService.inventory$;
    this.total$ = searchService.total$;
  }

  ngOnInit() {
    this.myCharacter = this.searchService.characters;
    if (this.myCharacter.length > 0) {
      this.searchService.getPostResult(this.myCharacter)
        .subscribe(result => {
          this.searchService.inventory = result;
        });
    }
  }

  ngOnDestroy() {
  }

  onTabChange(key: InventoryType) {
    this.searchService.active = key;
  }

  onSort({column, direction}: SortEvent) {
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.searchService.sortColumn = column;
    this.searchService.sortDirection = direction;
  }
}
