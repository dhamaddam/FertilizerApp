import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authServices : AuthService,
    private router : Router
  ){

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<any> | Promise<any> | boolean  {
    return this.authServices.getId().then( res => {
     if(res) return true;
     else { 
        this.router.navigateByUrl('/login')
        return false;
     }
    }). catch(e =>
      {
        console.log(e)
        return false;
      })
  }
}
