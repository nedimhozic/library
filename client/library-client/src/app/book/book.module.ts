import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';

import { BookService } from './book.service';

import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { RentComponent } from './components/rent/rent.component';

@NgModule({
  declarations: [EditComponent, CreateComponent, ListComponent, RentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookRoutingModule
  ],
  providers: [BookService]
})
export class BookModule { }
