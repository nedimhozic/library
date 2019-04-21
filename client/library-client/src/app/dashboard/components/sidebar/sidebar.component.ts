import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;
  
  constructor(private dashboardService: DashboardService) {
    this.user = JSON.parse(localStorage.getItem('Library_User'));
  }

  ngOnInit() {
  }

  logout() {
    this.dashboardService.logoutUser();
  }
}
