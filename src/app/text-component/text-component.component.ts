import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-text-component',
  templateUrl: './text-component.component.html',
  styleUrls: ['./text-component.component.scss']
})
export class TextComponentComponent implements OnInit {
  private id: number = 0;
  private text: string = "";

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.id = Number.parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.searchById(this.id).subscribe(texts => this.text = texts.result[0].text)
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
}

class TextResult {
  constructor(public id: number, public text: string) { }
}
interface ITextResponse {
  result: TextResult[];
}
