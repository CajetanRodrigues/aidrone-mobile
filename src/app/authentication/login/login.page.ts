import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  UserForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  message = '';
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    if (localStorage.getItem('token') === 'true') {
      this.router.navigateByUrl('home');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  onSubmit() {
    console.log(this.UserForm);
    this.userService.onLogin(this.UserForm.value.email, this.UserForm.value.password)
    .subscribe((data) => {
console.log(data);
    });
   // this.router.navigateByUrl('signup');
   localStorage.setItem('token', 'true');
   this.router.navigateByUrl('home');
  //   this.userService.onLogin(this.UserForm.value.email, this.UserForm.value.password)
  //  .subscribe((data: boolean) => {
  //    console.log(data);
  //    if (data === true) {
  //      this.router.navigateByUrl('home');
  //      localStorage.setItem('token', 'true');
  //    } else {
  //      this.message = 'Backend Error';
  //      localStorage.setItem('token', 'false');
  //    }

  //  });
}
  goToSignup() {
    this.router.navigateByUrl('signup');
  }

}
