import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../book.service';

import { BookModel } from '../../book.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  bookForm: FormGroup;
  submitted = false;
  book: BookModel;
  bookId: String;
  rentedBooks: RentedBookModel[] = [];

  get form() { return this.bookForm.controls; }

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService) {
    document.querySelector('#header_title').innerHTML = "Edit Existing Book";

    this.bookId = this.activatedRoute.snapshot.params.id;
    this.bookService.getBook(this.bookId).subscribe((data: BookModel) => {
      this.book = data;

      this.form.name.setValue(this.book.name);
      this.form.description.setValue(this.book.description);
      this.form.author.setValue(this.book.author);
      this.form.year.setValue(this.book.year);
      this.form.count.setValue(this.book.count);
    });

    this.bookService.getReadersByBook(this.bookId).subscribe((data: any) => {
      for (var i = 0; i < data.length; i++) {
        var name = data[i].firstName + ' ' + data[i].lastName;
        var query = {
          item: {
            book: this.bookId,
            returned: false
          }
        };
        var foundBook = data[i].rentedBooks.filter(item => item.book == this.bookId && item.returned == false);
        if (foundBook && foundBook.length > 0) {
          this.rentedBooks.push(
            {
              readerName: name,
              rentDate: foundBook[0].rentedAt
            }
          );
        }
      }
    });
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      author: ['', [Validators.required]],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1)]],
      count: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    this.book = {
      _id: this.bookId,
      name: this.form.name.value,
      description: this.form.description.value,
      author: this.form.author.value,
      year: this.form.year.value,
      count: this.form.count.value,
      rented: this.book.rented,
    }

    this.bookService.editBook(this.book).subscribe((data: BookModel) => {
      this.toastr.success('Book has been successfully updated', 'Success');
    })
  }

}

interface RentedBookModel {
  readerName: string,
  rentDate: Date
}
