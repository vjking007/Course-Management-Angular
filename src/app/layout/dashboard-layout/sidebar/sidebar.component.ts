import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isDashboardOpen = false;

  constructor() { }

  ngOnInit(): void {
  }
  toggleDashboardMenu(): void {
    this.isDashboardOpen = !this.isDashboardOpen;
  }

}
