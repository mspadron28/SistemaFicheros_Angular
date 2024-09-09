import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  nombre: string = '';
  password: string = '';
  role: string = 'investigadores'; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.nombre, this.password, this.role).subscribe(
      (response) => {
        if (this.role === 'investigadores') {
          this.router.navigate(['/dash-investigador']);
        } else if (this.role === 'organismos') {
          this.router.navigate(['/dash-organismo']);
        } else if (this.role === 'super-admin') {
          this.router.navigate(['/principal']);
        } else {
          console.error('Rol desconocido');
        }
      },
      (error) => {
        console.error('Error en la autenticación:', error);
      }
    );
  }

}
 