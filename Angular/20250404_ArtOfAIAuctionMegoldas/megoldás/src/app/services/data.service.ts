import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { PaintingModel } from '../models/painting.model';
import { BidModel } from '../models/bid.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://art-of-ai-auction.jedlik.cloud/api';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<CategoryModel[]>(`${this.apiUrl}/categories`);
  }

  getPaintings() {
    return this.http.get<PaintingModel[]>(`${this.apiUrl}/paintings`);
  }

  getPaintingsById(id: number) {
    return this.http.get<PaintingModel[]>(`${this.apiUrl}/paintings/${id}`);
  }

  postBid(bid: BidModel){
    return this.http.post<{ message: string }>(`${this.apiUrl}/bid`, bid);
  }

  getBids(paintingId: number) {
    return this.http.get<BidModel[]>(`${this.apiUrl}/bids/${paintingId}`);
  }
}
