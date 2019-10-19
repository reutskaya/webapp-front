import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {
  searchForm;
  searchValue:string = '';
  myControl = new FormControl();
  dropdown:Array<string> = ['ekke', 'lolo', 'ohmy'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: [''],
    });
  }

  updateDropDown() {
    //this.http.post('localhost:8082/find', {tokens: this.searchValue.split(' ')});
    console.log()
  }

  submitSearch() {
    this.router.navigate(['result'], { queryParams: { query: this.searchForm.value.query } });
  }
}

