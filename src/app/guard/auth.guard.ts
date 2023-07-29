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
      console.log("res canLoad",res);

     if(res) {
      let result  =  JSON.parse(JSON.stringify(res))
      result = JSON.parse(result)

     if (result.role_id == 2){
        this.router.navigateByUrl('/menu/dashboard-rekomendator', { replaceUrl: true });
      } else if (result.role_id == 3){
        this.router.navigateByUrl('/menu/dashboard', { replaceUrl: true });
      } else if (result.role_id == 1){
        this.router.navigateByUrl('/menu/dashboard', { replaceUrl: true });
      }

      return false;
     }
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
