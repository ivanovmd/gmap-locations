import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { injectScript } from '../helpers/inject-script';

@Injectable({
  providedIn: 'root'
})
export class MapsLoaderService {
  mapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCBTROq6LuvF_IE1r46-T4AeTSV-0d7my8&libraries=places';
  loadedSubject = new Subject();
  loaded = this.loadedSubject.asObservable() as Observable<boolean>;

  constructor() {
    injectScript(this.mapsUrl).then(() => this.loadedSubject.next(true));
  }
}
