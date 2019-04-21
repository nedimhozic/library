import { Component, OnInit } from '@angular/core';
import { ReaderService } from '../../reader.service';
import { ToastrService } from 'ngx-toastr';

import { ReaderModel } from '../../reader.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  readers: ReaderModel[];
  searchResult: ReaderModel[];

  constructor(private readerService: ReaderService, private toastr: ToastrService) {
    document.querySelector('#header_title').innerHTML = "List of Members";
    this.getReaders();
  }

  ngOnInit() {
  }

  deleteReader(reader: ReaderModel) {
    if(reader.rentedBooks){
      var books = reader.rentedBooks.filter(item => !item.returned);
      if(books.length > 0){
        this.toastr.warning('You cannot delete a member with rented books', 'Warning');
        return;
      }
    }
    var result = confirm('Are you sure you want to delete member?');
    if(!result) return;
    this.readerService.deleteReader(reader._id).subscribe((data: any) => {
      if (data) {
        this.toastr.success('Member has been removed successfully', 'Success');
        this.getReaders();
      } else {
        this.toastr.error('Something goes wrong', 'Error');
      }
    })
  }

  getReaders() {
    this.readerService.getAllReaders().subscribe((data: ReaderModel[]) => {
      this.readers = data;
      this.searchResult = data;
    });
  }

  onSearchChange(searchValue: string) {
    this.searchResult = this.readers;
    if (searchValue) {
      this.searchResult = this.readers.filter(item => {
        return item.email.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0 ||
          item.firstName.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0 ||
          item.lastName.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0;
      })
    }
  }
}
