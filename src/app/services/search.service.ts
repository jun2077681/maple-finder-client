import { Injectable } from '@angular/core';

interface Character {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  result: Character[] = [];

  constructor() { }

  getResult() {
    return this.result;
  }

  setResult(result: Character[]) {
    this.result = result;
  }
}
