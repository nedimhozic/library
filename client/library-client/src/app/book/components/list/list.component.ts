import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { ToastrService } from 'ngx-toastr';

import { BookModel } from '../../book.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  books: BookModel[];
  searchResult: BookModel[];

  constructor(private bookService: BookService, private toastr: ToastrService) {
    document.querySelector('#header_title').innerHTML = "List of Books";
    this.getBooks();
  }

  ngOnInit() {
  }

  deleteBook(book: BookModel) {
    if (book.rented > 0) {
      this.toastr.warning('You cannot delete rented books', 'Warning');
    }
    var result = confirm('Are you sure you want to delete book?');
    if(!result) return;
    
    this.bookService.deleteBook(book._id).subscribe((data: any) => {
      if (data) {
        this.toastr.success('Book has been removed successfully', 'Success');
        this.getBooks();
      } else {
        this.toastr.error('Something goes wrong', 'Error');
      }
    })
  }

  getBooks() {
    this.bookService.getAllBooks().subscribe((data: BookModel[]) => {
      this.books = data;
      this.searchResult = data;
    });
  }

  onSearchChange(searchValue: string) {
    this.searchResult = this.books;
    if (searchValue) {
      this.searchResult = this.books.filter(item => {
        return item.name.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0 ||
          item.author.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0 ||
          item.description.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0;
      })
    }
  }

}
