import { Region, Country } from './models/model';
import { Component, OnInit } from '@angular/core';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'countries-app';

  public countries: Country[];
  public regions: Region[] = [];
  public search: string;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
      this.groupByRegion(countries);
    });
  }

  filterCountries(event): void {
    const countries = this.countries.filter((item) =>
      item.name.toLocaleLowerCase().includes(event)
    );
    this.groupByRegion(countries);
  }

  private groupByRegion(countries: Country[]): void {
    this.regions = [];
    countries.map((country) => {
      let region = this.regions.find((item) => item.name === country.region);
      if (region) {
        region.countries.push(country);
      } else {
        region = {
          name: country.region,
          countries: [country],
        };
        this.regions.push(region);
      }
    });
    this.regions.find((region) => region.name === '')?.name = 'Unknown';
    this.regions.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
}
