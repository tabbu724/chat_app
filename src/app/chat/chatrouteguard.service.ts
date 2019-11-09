import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, Router } from "@angular/router";
import { CookieService } from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class ChatrouteguardService implements CanActivate{

  constructor(private router:Router,private cookie:CookieService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    if (this.cookie.get('authToken') == null || this.cookie.get('authToken') == undefined || this.cookie.get('authToken') == '') {
      this.router.navigate(['/login']);
      return false;
    }
    else {
      return true;
    }
  }
  
}
