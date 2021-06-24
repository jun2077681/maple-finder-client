import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";
import {Character} from "../../types/Character";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  myCharacter: Character[] = [];
  inputText: string = '';

  constructor(private router: Router,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.inputText = '';
  }

  onPaste(event: ClipboardEvent) {
    let pastedText = event.clipboardData?.getData('text');
    event.clipboardData?.clearData();
    console.log(pastedText);

    if (pastedText) {
      const start = pastedText.indexOf("02월드/캐릭터");
      const end = pastedText.indexOf("대표캐릭터는 10레벨 이상이어야 지정할 수 있습니다.");
      if (start !== -1 && end !== -1) {
        pastedText = pastedText.slice(start, end);
      }

      const plist = pastedText.split('\n');
      const world = plist[1].trim();
      let pastedNames = plist[2].trim();
      const names = [];

      while (true) {
        if (pastedNames.length === 0) {
          break;
        }
        const index = pastedNames.indexOf(world);
        const nick = pastedNames.slice(0, index);

        if (nick.length > 0) {
          names.push(nick);
        }

        const nextIndex = pastedNames.indexOf(nick, index);
        if (nextIndex !== -1) {
          pastedNames = pastedNames.slice(nextIndex + nick.length);
        } else {
          break;
        }
      }

      this.inputText = names.join(',');
      event.preventDefault();
    }
  }

  pushCharacter(names: string) {
    for (let name of names.split(',')) {
      this.myCharacter.push({name: name.trim()});
    }
  }

  popCharacter(i: number) {
    if (i < this.myCharacter.length) {
      this.myCharacter.splice(i, 1);
    }
  }

  onSearch() {
    this.searchService.setCharacters(this.myCharacter);
    this.router.navigate(['/result']);
  }

  ngOnDestroy() {

  }
}
