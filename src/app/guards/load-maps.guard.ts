import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MapsLoaderService } from '../services/maps-loader.service';
import { map, skip } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoadMapsGuard implements CanActivate {
  constructor(private mapsLoaderService: MapsLoaderService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.mapsLoaderService.loaded;
  }

}
