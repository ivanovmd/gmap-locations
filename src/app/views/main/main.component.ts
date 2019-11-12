import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


declare const google: any;

const mapOptions = {
  travelMode: 'DRIVING',
  avoidTolls: true
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  mapHidden = true;
  autocompleteService = new google.maps.places.AutocompleteService();
  locationSuggestions: Observable<any>;
  tasks = [];
  directionsService: any;
  directionsRenderer: any;
  String = String;
  pickupLocationControl = new FormControl();
  dropoffLocationControl = new FormControl();

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    const map = new google.maps.Map(document.getElementById('map'));

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map
    });
  }

  updateRoute() {
    if (this.tasks.length > 1) {
      this.directionsService.route({
        origin: this.tasks[0].location,
        destination: this.tasks[this.tasks.length - 1].location,
        waypoints: this.tasks.slice(1, -1).map(el => { return { location: el.location } }),
        ...mapOptions
      }, (response, status) => {
        if (status === 'OK') {
          this.zone.run(() => {
            this.directionsRenderer.setDirections(response);
            this.mapHidden = false;
          });
        } else {
          alert('Could not display directions due to: ' + status);
        }
      });
    } else {
      this.mapHidden = true;
    }
  }

  addTask() {
    let taskId = Math.random(); // pseudo id
    this.tasks.push({
      taskId,
      location: this.pickupLocationControl.value,
      isPickup: true
    }, {
      taskId,
      location: this.dropoffLocationControl.value,
      isPickup: false
    });

    this.pickupLocationControl.reset();
    this.dropoffLocationControl.reset();

    this.updateRoute();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.updateRoute();
  }

  removeLocation(taskId) {
    this.tasks = this.tasks.filter(task => task.taskId !== taskId);
    this.updateRoute();
  }
}
