import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManufacturerModel } from '../models/manufacturer.model';
import { CarModel } from '../models/car.model';
import { VoteModel } from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://caroftheyear2023.jedlik.cloud/api';

  constructor(private http: HttpClient) { }

  getManufacturers() {
    return this.http.get<ManufacturerModel[]>(`${this.apiUrl}/manufacturers`);
  }

  getCars() {
    return this.http.get<CarModel[]>(`${this.apiUrl}/cars`);
  }

  getCarsByManufacturer(manufacturerId: number) {
    return this.http.get<CarModel[]>(`${this.apiUrl}/cars/${manufacturerId}`);
  }

  postVote(vote: VoteModel) {
    return this.http.post<{message: string}>(`${this.apiUrl}/vote`, vote);
  }

}
