import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { FriendsService } from '../../shared/friends.service';

import { Friend } from '../../model/friends';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search:FormControl = new FormControl;
  searchResults:Friend[];

  constructor(
    private friendServ: FriendsService
  ) { }

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((search:string) => this.friendServ.search(search))
    ).subscribe(
      (response) => {
        this.searchResults = response.results;
      }
    )
  }

}
