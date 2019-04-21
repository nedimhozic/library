import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';

import { UserService } from '../../user.service';
import { ToastrService } from 'ngx-toastr';

import { UserModel } from '../../user.model';

import { MustMatch } from '../../../shared/helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user: UserModel;

  get form() { return this.registerForm.controls; }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    document.body.className = "user-page";
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      uniqueId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  ngOnDestroy() {
    document.body.className = "";
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.user = {
      uniqueId: this.form.uniqueId.value,
      email: this.form.email.value,
      firstName: this.form.firstName.value,
      lastName: this.form.lastName.value,
      password: this.form.password.value
    }

    this.userService.registerUser(this.user).subscribe((data: any) => {
      if (data && data.success) {
        this.toastr.success('Check You inbox and confirm Your registration', 'Success');
        this.submitted = false;
        this.registerForm.reset();
      } else {
        this.toastr.error('Something goes wrong', 'Error');
      }
    })
  }

}
