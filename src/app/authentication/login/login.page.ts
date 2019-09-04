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

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.userService.onLogin(this.UserForm.value.email, this.UserForm.value.password)
    .subscribe((res: any) => {
      console.log(res);
      if (res === 'true') {
        this.router.navigateByUrl('home');
        return;
      }
      this.router.navigateByUrl('login');
    });
  }
  goToSignup() {
    this.router.navigateByUrl('signup');
  }

}
