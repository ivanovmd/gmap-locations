import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { LoadMapsGuard } from './guards/load-maps.guard';
import { MainComponent } from './views/main/main.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [LoadMapsGuard],
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    DragDropModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [LoadMapsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
