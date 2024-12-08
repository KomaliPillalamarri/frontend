import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  confirm_password: string = ""
  isSignUp: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  registerPayload:any = {
    username: '',
    email: '',
    phone: '',
    password: '',
    phoneNumber: '',
    role: 'ADMIN'
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
    this.successMessage = '';
  }

  async signUp() {
    try{
      if(this.registerPayload.password !== this.confirm_password){
        this.errorMessage = "Password not match"
        return;
      }
      const success = await this.authService.signUp(this.registerPayload)
      success ? this.router.navigate(['/login']) : this.errorMessage = "invalid credentials"
    }catch(e:any){
        console.log(e);
        this.errorMessage = e.message
    }
  }
}
