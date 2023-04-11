import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  navigationWithParams(){
    this.router.navigateByUrl('/menu/second/details?filter=color&category=painting');
  }

  navigationWithState () {
    const navigationExtras: NavigationExtras = {
      state: {
        user:{
          id:42,
          name:'Simon',
        },
      },
    };
    this.router.navigateByUrl("/details", navigationExtras);
  }
  navigationWithObject(){
    const navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify({ 
          category: 'foo',
          filter: 'bar'
      }),
      }
    };
    this.router.navigate(['menu/second/details'], navigationExtras);
  }
  ngOnInit() {
  }

}
