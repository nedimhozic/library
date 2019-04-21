import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('Library_User'));
  }

  ngOnInit() {
  }

}
