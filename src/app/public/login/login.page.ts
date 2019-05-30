import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.initLoginFormGroup();
  }

  initLoginFormGroup() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  login() {
    // this.authService.login('juan');
    this.authService.login(this.loginForm.value).subscribe( res => {
      console.log(res);
    });
  }

}
