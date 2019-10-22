import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponentComponent } from './search-component/search-component.component';
import { TextComponentComponent } from './text-component/text-component.component';

const routes: Routes = [
  { path: '', component: SearchComponentComponent},
  { path: 'text', component: TextComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
