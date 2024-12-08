import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    
    ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
