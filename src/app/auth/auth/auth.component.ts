import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoading: boolean = false;
  error: string = null;
  

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (document.getElementById("loginButton").innerText === "Sign Up") {
      this.authService.signUp(email, password).subscribe(data => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/rooms']);
      },
        error => {
          console.log(error);
          this.error = "An error occurred";
          if(error.error.error.message === "EMAIL_EXISTS"){
            this.error = "This email is already in use!";
          }
          this.isLoading = false;
        }
      );
    }

    if (document.getElementById("loginButton").innerText === "Login"){
      this.authService.logIn(email, password).subscribe(data => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/rooms']);
      },
      error => {
        console.log(error);
        this.error = "An error has occurred";
        if(error.error.error.message === "EMAIL_NOT_FOUND"){
          this.error = "This email is not registered!";
        }
        if(error.error.error.message === "INVALID_LOGIN_CREDENTIALS"){
          this.error = "The credentials are not in our database!";
        }
        this.isLoading = false;
      }
    );
    }
    form.reset(); 
  }

  switchButtonClicked() {
    if (document.getElementById("loginButton").innerText === "Login") {
      document.getElementById("loginButton").innerText = "Sign Up";
      document.getElementById("switchButton").innerText = "Switch to Login";
    }
    else {
      document.getElementById("loginButton").innerText = "Login";
      document.getElementById("switchButton").innerText = "Switch to Sign Up";
    }

  }

}
