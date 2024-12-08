import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";


@Injectable({
    providedIn: 'root'
})

export class AdminGaurd implements CanActivate {
    constructor(private authService:AuthService,private router:Router) {}

    canActivate():boolean {
        const user = this.authService.currentUser;
        if(user && user.role === 'ADMIN'){
            return true;
        }

        return false;
    }
}