import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderRoutingModule } from './reader-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ReaderService } from './reader.service';

import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import { RentedBooksPipe } from '../shared/pipes/rented.pipe';

@NgModule({
  declarations: [RentedBooksPipe, ListComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    ReaderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [ReaderService]
})
export class ReaderModule { }
