import { Component, OnInit, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() googleAutocompleteService: any;
  @Input() placeholder = 'Enter value';

  formControl = new FormControl();
  suggestions: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.suggestions = this.formControl.valueChanges.pipe(
      tap(value => this.onChange(value)),
      switchMap(value => value ? this.receiveSuggestions(value) : from([[]]))
    );
  }

  receiveSuggestions(input): Observable<any> {
    return from(new Promise(resolve => {
      this.googleAutocompleteService.getQueryPredictions({ input }, (predictions: any[]) => {
        resolve(predictions);
      });
    }));
  }

  writeValue(value) {
    this.formControl.setValue(value);
  }

  onChange(value) {}

  onTouched() {}

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
