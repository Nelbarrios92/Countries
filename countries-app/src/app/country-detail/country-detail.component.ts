import { Component, OnInit, Inject } from '@angular/core';
import { Country } from './../models/model';
import { CountryService } from './../services/country.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  bordersCountries: string;
  currencies: string;
  languages: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public country: Country,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.currencies = this.country.currencies.map((item) => item.name).join(', ');
    this.languages = this.country.languages.map((item) => item.name).join(', ');
    this.countryService
      .getCountries()
      .pipe(
        map((countries) =>
          countries.filter((country) =>
            this.country.borders.some((item) => item === country.alpha3Code)
          )
        )
      )
      .subscribe((countries) => {
        this.bordersCountries = countries.map((item) => item.name).join(', ');
      });
  }
}
