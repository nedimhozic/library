import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardService } from './dashboard.service';

import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent, HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  bootstrap: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule { }
