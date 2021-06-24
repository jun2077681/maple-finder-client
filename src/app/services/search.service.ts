import {Injectable, PipeTransform} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {Character, Result} from "../types/Character";
import {Inventory, InventoryJSON, Item} from "../types/Item";

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  characters: Character[] = [];
  result: Result = {
    name: '',
    num: 0
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.characters;
  }

  setCharacters(characters: Character[]) {
    this.characters = characters;
  }

  getPostResult(reqData: Character[]): Observable<InventoryJSON> {
    return this.http.post<InventoryJSON>('http://localhost:8080', reqData, this.httpOptions);
  }

  setPostResult(result: Result) {
    this.result = result;
  }

  filterItem(text: string, inventory: Inventory): Inventory {
    const filterResult = new Map();

    for(let [key, value] of inventory) {
      filterResult.set(key, value.filter(i => {
        const term = text.toLowerCase();
        return i.name.toLowerCase().includes(term);
      }));
    }

    return filterResult;
  }
}
