/*
 * HomeComponent
HomeComponent displays a list of housing locations with filtering capability.
This component fetches housing locations from the HousingService and displays them.
Users can filter the housing locations by city, state, or name using the search input.
The component uses the HousingLocationComponent to render each housing location in the list. 
*/

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
    <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation">
    </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
 
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
  
    const searchText = text.trim().toLowerCase();
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation =>
        (housingLocation?.city?.toLowerCase().includes(searchText) ||
         housingLocation?.state?.toLowerCase().includes(searchText) ||
         housingLocation?.name?.toLowerCase().includes(searchText))
    );
  }
   
}
