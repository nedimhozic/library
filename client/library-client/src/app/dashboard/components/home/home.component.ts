import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stat: Statistics;

  activeReaders: any[];
  mostRentedBooks: any[] = [];

  constructor(private service: DashboardService) {
    document.querySelector('#header_title').innerHTML = "Home";

    this.service.getStatistics().subscribe((data: Statistics) => {
      this.stat = data;
    });
  }

  ngOnInit() {
  }

}

interface Statistics {
  books: {
    copies: Number,
    count: Number,
    rented: Number,
    mostRented: [
      {
        name: String,
        author: String,
        totalRented: Number
      }
    ]
  },
  readers: {
    count: Number,
    active: [
      {
        firstName: String,
        lastName: String,
        books: Number
      }
    ]
  }
}