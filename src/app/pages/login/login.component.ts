import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent,FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isSignUp: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
    this.successMessage = '';
  }

  async login() {
    try{
      const success = await this.authService.login(this.username,this.password)
      console.log(success);
      const redirectUrl = history.state?.redirectUrl || '/';
      success ? this.router.navigate([redirectUrl]) : this.errorMessage = "invalid credentials"
    }catch(e:any){
        console.log(e);
        this.errorMessage = e.message
    }
  }

  clearForm() {
    this.username = '';
    this.password = '';
  }
}
