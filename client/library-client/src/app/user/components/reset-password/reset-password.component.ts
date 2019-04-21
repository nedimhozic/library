import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user.service';

import { MustMatch } from '../../../shared/helpers/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  token: string;
  get form() { return this.resetForm.controls; }

  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
    document.body.className = "user-page";
    this.token = this.activatedRoute.snapshot.queryParams.token;
  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  ngOnDestroy(){
    document.body.className = "";
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetForm.invalid) {
        return;
    }

    if(!this.token){
      this.toastr.warning('You have wrong link for reset password', 'Warning');
      return;
    }

    this.userService.resetPassword(this.token, this.form.password.value).subscribe((data: any) => {
      if(data && data.success){
        this.toastr.success('You have successfully changed password', 'Success');
        this.router.navigate(['/user/login']);
      } else {
        this.toastr.error('Something goews wrong', 'Error');
        
      }
    })
}

}
