import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponentComponent } from './search-component/search-component.component';
import { ResultComponentComponent } from './result-component/result-component.component';

const routes: Routes = [
  { path: '', component: SearchComponentComponent},
  { path: 'result', component: ResultComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
