import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElementSchemaRegistry } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  get form() { return this.loginForm.controls; }

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    document.body.className = "user-page";
    let token = this.activatedRoute.snapshot.queryParams.token;
    if (token) {
      this.userService.confirmUser(token).subscribe((data: any) => {
        if (data.success) {
          this.toastr.success('You have successfully activated account', 'Success');
        } else {
          this.toastr.error('Something goes wrong', 'Error');
        }
      });
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy() {
    document.body.className = "";
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.form.email.value, this.form.password.value).subscribe(data => {
      localStorage.setItem('Library_User', JSON.stringify(data));
      this.router.navigate(['/dashboard/home']);
    })
  }

}
