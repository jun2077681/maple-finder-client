import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

import {Character} from "../types/Character";
import {Inventory, InventoryType, Item} from "../types/Item";
import {SortColumn, SortDirection} from "../directive/sortable.directive";

interface SearchResult {
  items: Item[];
  total: number;
}

interface State {
  active: InventoryType;
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: number | undefined | string, v2: number | undefined | string) => {
  if (v1 === undefined) return 0;
  if (v2 === undefined) return 0;

  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(items: Item[], column: SortColumn, direction: string): Item[] {
  if (direction === '' || column === '') {
    return items;
  } else {
    return [...items].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(item: Item, term: string) {
  return item.name.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _characters: Character[] = [];

  private _search$ = new Subject<void>();
  private _inventory$ = new BehaviorSubject<Item[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _inventory: Inventory = {
    "equip": [],
    "use": [],
    "setup": [],
    "etc": [],
    "cash": []
  };
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    active: "equip",
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(100),
      switchMap(() => this._search()),
      delay(100),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._inventory$.next(result.items);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get characters() { return this._characters; }
  set characters(characters: Character[]) { this._characters = characters; }

  get inventory$() { return this._inventory$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set inventory(inventory: Inventory) { this._inventory = inventory; }
  set active(active: InventoryType) { this._set({active}); }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  getPostResult(reqData: Character[]): Observable<Inventory> {
    return this.http.post<Inventory>('http://localhost:7777', reqData, this.httpOptions);
  }

  private _search(): Observable<SearchResult> {
    const {active, page, pageSize, searchTerm, sortColumn, sortDirection} = this._state;

    // 1. sort
    let items = sort(this._inventory[active], sortColumn, sortDirection);

    // 2. filter
    items = items.filter(item => matches(item, searchTerm));
    const total = items.length;

    // 3. paginate
    items = items.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({items, total});
  }
}
