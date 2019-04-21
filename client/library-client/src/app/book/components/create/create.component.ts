import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../book.service';

import { BookModel } from '../../book.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  bookForm: FormGroup;
  submitted = false;
  book: BookModel;

  get form() { return this.bookForm.controls; }

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private bookService: BookService) {
    document.querySelector('#header_title').innerHTML = "Add New Book";
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
      name: this.form.name.value,
      description: this.form.description.value,
      author: this.form.author.value,
      year: this.form.year.value,
      count: this.form.count.value,
      rented: 0
    }

    this.bookService.createBook(this.book).subscribe((data: BookModel) => {
      this.router.navigate(['/dashboard/book/edit', data._id]);
      this.toastr.success('Book has been successfully created', 'Success');
    })
  }


}
