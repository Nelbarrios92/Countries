import { Country } from './../models/model';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryDetailComponent } from './../country-detail/country-detail.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent {
  @Input() regionName: string;
  @Input() countries: Country[];

  constructor(private dialog: MatDialog) {}

  /**
   * Open details for a country.
   *
   * @param country :selected country.
   */
  openCountryDetails(country: Country) {
    this.dialog.open(CountryDetailComponent, {
      data: country,
      width: '590px',
      disableClose: true,
    });
  }
}
