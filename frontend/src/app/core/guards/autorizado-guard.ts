import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';

export class AutorizadoGuard implements CanActivate{
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): 
    MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }
} 
