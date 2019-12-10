import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  search:FormControl = new FormControl;
  searchSubscription:Subscription;

  constructor() { }

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    )
    .subscribe(
      (search) => {
        console.log(search);
      }
    )
  }

  ngOnDestroy() {
    if(this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

}
