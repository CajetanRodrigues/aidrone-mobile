import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  UserForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  message = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
        console.log(this.UserForm);
       // this.router.navigateByUrl('login');
        this.userService.onSignup(this.UserForm.value.name, this.UserForm.value.email, this.UserForm.value.password)
       .subscribe((data: boolean) => {
         console.log(data);
         if (data === true) {
           this.router.navigateByUrl('login');
         } else {
           this.message = 'Backend Error';
         }

       });
  }
  goToLogin() {
       this.router.navigateByUrl('login');
  }
}
