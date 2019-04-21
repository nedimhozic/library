import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { RentComponent } from './components/rent/rent.component';

const BookRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'edit/:id',
        component: EditComponent
      },
      {
        path: 'rent/:id',
        component: RentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(BookRoutes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
