import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CarModel } from '../../models/car.model';
import { ManufacturerModel } from '../../models/manufacturer.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-list',
  imports: [RouterLink],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  cars: CarModel[] = [];
  manufacturers: ManufacturerModel[] = [];

  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.dataService.getCars().subscribe({
      next: (response) => {this.cars = response;},
      error: (error) => { console.log(error); }
    });

    this.dataService.getManufacturers().subscribe({
      next: (response) => {this.manufacturers = response;},
      error: (error) => { console.log(error); }
    });
  }

  onManufacturerChange(event: Event) {
    const manfuacturerID = (event.target as HTMLSelectElement).value;
    if (manfuacturerID === '') {
      this.dataService.getCars().subscribe({
        next: (response) => {this.cars = response;},
        error: (error) => { console.log(error); }
      });
    }
    else {
      this.dataService.getCarsByManufacturer(Number(manfuacturerID)).subscribe({
        next: (response) => {this.cars = response;},
        error: (error) => { console.log(error); }
      });
    }
  }
}
