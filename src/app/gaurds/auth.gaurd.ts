import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";


@Injectable({
    providedIn: 'root'
})

export class AuthGaurd implements CanActivate {
    constructor(private authService:AuthService,private router:Router){}

    canActivate() {
        if(!this.authService.isLoggedIn){
            this.router.navigate(['/login'])
            return false;
        }
        return true;
    }
}