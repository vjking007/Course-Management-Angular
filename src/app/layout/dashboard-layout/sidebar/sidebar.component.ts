import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isDashboardOpen = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  toggleDashboardMenu(): void {
    this.isDashboardOpen = !this.isDashboardOpen;
  }
  logout() {
    localStorage.removeItem('token'); // Clear auth token
    this.router.navigate(['/login']); // Redirect to login
  }
}
