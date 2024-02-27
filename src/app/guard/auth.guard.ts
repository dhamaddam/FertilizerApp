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
     if(res) {
      let result  =  JSON.parse(JSON.stringify(res))
      result = JSON.parse(result)
        if (result.role === 'Administrator'){
          this.router.navigateByUrl('/menu/dashboard-rekomendator', { replaceUrl: true });
        } 
        return true
     }
     
     this.router.navigate(['/login']);
     return false;

    }). catch(e =>
      {
        console.log(e)
        return false;
      })
  }
}
