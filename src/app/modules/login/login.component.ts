import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  loginForm!:FormGroup;

  constructor(private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router) {}

  ngOnInit(): void {
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  }
  
  onSubmit() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        const username = this.auth.getUsernameFromToken();
        this.auth.setLoggedInUsername(username!);
        this.router.navigate(['/admin/courses']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }

}
