import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReaderService } from '../../reader.service';

import { ReaderModel } from '../../reader.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  readerForm: FormGroup;
  submitted = false;
  reader: ReaderModel;

  get form() { return this.readerForm.controls; }

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private readerService: ReaderService) {
    document.querySelector('#header_title').innerHTML = "Add New Member";
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
      firstName: this.form.firstName.value,
      lastName: this.form.lastName.value,
      email: this.form.email.value,
      dateOfBirth: this.form.dateOfBirth.value,
      isStudent: this.form.isStudent.value,
      gender: this.form.gender.value,
    }

    this.readerService.createReader(this.reader).subscribe((data: ReaderModel) => {
      this.router.navigate(['/dashboard/reader/edit', data._id]);
      this.toastr.success('Member has been successfully created', 'Success');
    })
  }

}
