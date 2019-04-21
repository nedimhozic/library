import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../book.service';

import { BookModel } from '../../book.model';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  bookId: String;
  book: BookModel;
  readers: ReaderModel[];
  searchResult: ReaderModel[];
  searchInput: String = '';

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    document.querySelector('#header_title').innerHTML = "Rent Book";
    this.bookId = this.activatedRoute.snapshot.params.id;

    this.loadBook();
    this.loadReaders();
  }

  ngOnInit() {
  }

  loadBook(){
    this.bookService.getBook(this.bookId).subscribe((data: BookModel) => {
      this.book = data;
    });
  }

  loadReaders() {
    this.bookService.getReaders().subscribe((data: ReaderModel[]) => {
      this.readers = data;
      for (var i = 0; i < this.readers.length; i++) {
        this.readers[i].canRent = true;
        var book = this.readers[i].rentedBooks.filter(item => item.book._id == this.bookId);
        if(book && book.length > 0){
          if(book[0].returned == false){
            this.readers[i].canRent = false;
            this.readers[i].uuid = book[0].uuid;
          }
        }
      }
      this.searchResult = data;
      this.searchInput = '';
    });
  }

  onSearchChange(searchValue: string) {
    this.searchResult = this.readers;
    if (searchValue) {
      this.searchResult = this.readers.filter(item => {
        return item.firstName.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0 ||
          item.lastName.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0;
      })
    }
  }

  rentBook(readerId: String) {
    if (this.book.count == this.book.rented) {
      this.toastr.warning('There is not enough copies for rent', 'Warning');
      return;
    }

    var result = confirm('Are you sure you want to rent book?');
    if(!result) return;

    this.bookService.rentBook(readerId, this.bookId).subscribe((data: any) => {
      if (data && data.success) {
        this.toastr.success('You have been successfully rented a book', 'Success');
        this.loadBook();
        this.loadReaders();
      } else {
        this.toastr.error('Something goes wrong', 'Error');
      }
    })
  }

  returnBook(uuid: String) {
    var result = confirm('Are you sure you want to return book?');
    if(!result) return;

    this.bookService.returnBook(uuid, this.bookId).subscribe((data: any) => {
      if (data && data.success) {
        this.toastr.success('You have been successfully returned a book', 'Success');
        this.loadBook();
        this.loadReaders();
      } else {
        this.toastr.error('Something goes wrong', 'Error');
      }
    })
  }
}

interface ReaderModel {
  _id: String,
  firstName: String,
  lastName: String,
  rentedBooks: [{
    _id: String,
    book: {
      _id: String
    },
    returned: Boolean,
    uuid: String
  }],
  canRent: Boolean,
  uuid: String
}