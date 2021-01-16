import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { NoteComponent } from './note/note.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteSearchComponent } from './note-search/note-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  // The default route to the users
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  // The routing to the different views
  { path: 'users', component: UserComponent },
  { path: 'notes', component: NoteComponent },
  // A parameterized route that matches the path to the detail view
  { path: 'userdetail/:id', component: UserDetailComponent },
  { path: 'notedetail/:id', component: NoteDetailComponent },
  // Route to the search / filter function
  { path: 'search/:id', component: NoteSearchComponent },
  { path: 'dashboard/:id/:name', component: DashboardComponent },
  { path: 'table', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
