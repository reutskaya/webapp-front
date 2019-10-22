import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {
  private searchForm: FormGroup;
  private dropdown: TextResult[] = [];
  private isLoading: boolean = false;
  private searchResults: TextResult[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      query: new FormControl(),
    });

    this.searchForm
      .get('query')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(text => {
          if (text.id) {
            return this.searchById(text.id)
              .pipe(
                finalize(() => this.isLoading = false),
              )
          }
          return this.searchByString(text)
            .pipe(
              finalize(() => this.isLoading = false),
            )
        }
        )
      )
      .subscribe(texts => {
        if (this.searchForm.value.query.id != undefined) {
          this.searchResults = texts.result
        } else {
          this.dropdown = texts.result.slice(0, 5)
        }
      }
      );
  }

  searchByString(query: string): Observable<ITextResponse> {
    return this.http.post('/api/find', { tokens: query.split(' ') })
      .pipe(
        tap((response: ITextResponse) => {
          response.result = response.result
            .map(text => new TextResult(text.id, text.text))
          return response;
        })
      );
  }

  searchById(id: number): Observable<ITextResponse> {
    return this.http.get('/api/get/' + id)
      .pipe(
        tap((response: ITextResponse) => {
          response.result = response.result
            .map(text => new TextResult(text.id, text.text))
          return response
        })
      );
  }

  submitSearch() {
    if (this.searchForm.value.query.id != undefined) {
      return this.searchById(this.searchForm.value.query.id)
        .subscribe(texts => this.searchResults = texts.result)
    } else if (this.searchForm.value.query != "") {
      return this.searchByString(this.searchForm.value.query)
        .subscribe(texts => this.searchResults = texts.result)
    }
  }

  displayFn(text: TextResult) {
    if (text) { return text.text; }
  }
}

class TextResult {
  constructor(public id: number, public text: string) { }
}
interface ITextResponse {
  result: TextResult[];
}
