import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  film? : Observable<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.film = this.http.get('https://swapi.dev/api/films');
    console.log('i am here');
    this.film.subscribe(data =>
      {
        console.log('my data:', data);
      })
  }

}
