import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {
  private searchForm: FormGroup;
  private dropdown: TextResult[] = [];

  private searchResults: TextResult[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      query: new FormControl(),
    });
  }

  updateDropDown() {
    if (this.searchForm.value.query.text != undefined) {
      this.submitSearch();
      return;
    }

    //this.http.post('localhost:8082/find', {tokens: this.searchForm.value.query.split(' '));

    let results: TextResult[] = [
      { id: 1, text: 'A' },
      { id: 2, text: 'B' },
      { id: 3, text: 'C' },
      { id: 4, text: 'D' },
      { id: 5, text: 'E' },
      { id: 6, text: 'F' }];

    this.dropdown = results.slice(0, 5);
  }

  submitSearch() {
    if (this.searchForm.value.query.id != undefined) {
      //this.http.get('localhost:8082/get/' + this.searchForm.value.query.id);
      this.searchResults = [{ id: 2, text: 'B' }];
    } else if (this.searchForm.value.query != "") {
      //this.http.post('localhost:8082/find', {tokens: this.searchForm.value.query.split(' '));

      this.searchResults = [
        { id: 1, text: 'A' },
        { id: 2, text: 'B' },
        { id: 3, text: 'C' },
        { id: 4, text: 'D' },
        { id: 5, text: 'E' },
        { id: 6, text: 'F' }];
    }
  }

  displayFn(text: TextResult) {
    if (text) { return text.text; }
  }
}

class TextResult {
  constructor(public id: number, public text: string) { }
}