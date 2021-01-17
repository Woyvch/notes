import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* Componenten */
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  /* De standaard route */
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  /* De route naar de tabel met gebruikers */
  { path: 'table', component: TableComponent },
  /* Een route met parameters naar de notities*/
  { path: 'dashboard/:id/:name', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
