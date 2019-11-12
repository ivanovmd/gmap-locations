import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';


declare const google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  autocompleteService = new google.maps.places.AutocompleteService();
  locationControl = new FormControl();
  pickupControl = new FormControl(true);
  locationSuggestions: Observable<any>;

  constructor() {
    this.locationSuggestions = this.locationControl.valueChanges.pipe(
      switchMap(value => value ? this.receiveSuggestions(value) : from([[]]))
    );
  }

  ngOnInit() {
  }

  receiveSuggestions(input): Observable<any> {
    return from(new Promise(resolve => {
      this.autocompleteService.getQueryPredictions({ input }, (predictions: any[]) => {
        resolve(predictions);
      });
    }));
  }

}
