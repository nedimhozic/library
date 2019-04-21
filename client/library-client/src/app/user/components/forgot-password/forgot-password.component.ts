import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  submitted = false;

  get form() { return this.forgotForm.controls; }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService) { 
    document.body.className = "user-page";
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy(){
    document.body.className = "";
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgotForm.invalid) {
      return;
    }

    this.userService.forgotPassword(this.form.email.value).subscribe((data: any) => {
      if(data && data.success){
        this.toastr.success('Check Your inbox for further instructions', 'Success');
      } else {
        this.toastr.error('Something goes wrong', 'Error');
      }
    });
  }

}
