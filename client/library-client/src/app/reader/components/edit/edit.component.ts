import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReaderService } from '../../reader.service';

import { ReaderModel } from '../../reader.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  readerForm: FormGroup;
  submitted = false;
  reader: ReaderModel;
  books: any[];
  readerId: String;
  maxDate: Date = new Date();

  get form() { return this.readerForm.controls; }

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readerService: ReaderService) {

    document.querySelector('#header_title').innerHTML = "Edit Existing Member";

    this.maxDate.setDate(new Date().getDate() - 1);

    this.readerId = this.activatedRoute.snapshot.params.id;
    this.readerService.getReader(this.readerId).subscribe((data: ReaderModel) => {
      this.reader = data;
      this.books = this.reader.rentedBooks;

      this.form.firstName.setValue(this.reader.firstName);
      this.form.lastName.setValue(this.reader.lastName);
      this.form.email.setValue(this.reader.email);
      this.form.dateOfBirth.setValue(this.reader.dateOfBirth);
      this.form.isStudent.setValue(this.reader.isStudent);
      this.form.gender.setValue(this.reader.gender);
    })
  }

  ngOnInit() {
    this.readerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
      isStudent: [false, []],
      gender: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.readerForm.invalid) {
      return;
    }

    this.reader = {
      _id: this.readerId,
      firstName: this.form.firstName.value,
      lastName: this.form.lastName.value,
      email: this.form.email.value,
      dateOfBirth: this.form.dateOfBirth.value,
      isStudent: this.form.isStudent.value,
      gender: this.form.gender.value,
    }

    this.readerService.editReader(this.reader).subscribe((data: ReaderModel) => {
      this.toastr.success('Member has been successfully update', 'Success');
    })
  }

  onSearchChange(value: String) {
    this.books = this.reader.rentedBooks;
    if (value == '1') {
      this.books = this.reader.rentedBooks.filter(item => item.returned == true);
    } else if (value == '2') {
      this.books = this.reader.rentedBooks.filter(item => item.returned == false);
    }
  }
}
