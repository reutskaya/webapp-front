import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-text-component',
  templateUrl: './text-component.component.html',
  styleUrls: ['./text-component.component.scss']
})
export class TextComponentComponent implements OnInit {
  private id: number = undefined;
  private text: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    let id = Number.parseInt(this.route.snapshot.queryParamMap.get('id'));
    if (isNaN(id)) {
      this.router.navigateByUrl('/404');
    } else {
      this.searchById(id)
      .subscribe(texts => {
        if (texts.result.length > 0) {
          this.text = texts.result[0].text;
          this.id = texts.result[0].id;
        } else {
          this.router.navigateByUrl('/404');
        }
      },
      _ => this.router.navigateByUrl('/404')
      );
    }
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
