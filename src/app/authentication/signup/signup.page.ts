import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.onSignup(this.UserForm.value.name, this.UserForm.value.email, this.UserForm.value.password)
    .subscribe((data) => {
      if (data) {
        this.router.navigate(['login']);
        return;
      }
      this.router.navigateByUrl('signup');
    });
    console.warn(this.UserForm.value);
  }
  goToLogin() {
    this.router.navigateByUrl('login');
  }
}
