import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';

const DashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'reader',
                loadChildren: '../reader/reader.module#ReaderModule'
            },
            {
                path: 'book',
                loadChildren: '../book/book.module#BookModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(DashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
