import { Component, OnInit } from '@angular/core';
import { PaintingModel } from '../../models/painting.model';
import { DataService } from '../../services/data.service';
import { CategoryModel } from '../../models/category.model';
import { BidModel } from '../../models/bid.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-painting-list',
  imports: [RouterLink],
  templateUrl: './painting-list.component.html',
  styleUrl: './painting-list.component.css'
})
export class PaintingListComponent implements OnInit {
  paintings: PaintingModel[] = [];
  categories: CategoryModel[] = [];
  bidsOfPainting: BidModel[] = [];
  selectedPainting : number | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPaintings().subscribe({
      next: (response) => {this.paintings = response;},
      error: (error) => {console.log(error);}
    });

    this.dataService.getCategories().subscribe({
      next: (response) => {this.categories = response;},
      error: (error) => {console.log(error);}
    });
  }

  onCategoryChange(event: Event) {
    const categoryId = (event.target as HTMLSelectElement).value;
    if (categoryId == '') {
      this.dataService.getPaintings().subscribe({
        next: (response) => {this.paintings = response;},
        error: (error) => {console.log(error);}
      });
    }
    else {

      this.dataService.getPaintingsById(Number(categoryId)).subscribe({
        next: (response) => {this.paintings = response;},
        error: (error) => {console.log(error);}
      });
    }
  }

  showBids(paintingId: number) {
    this.selectedPainting = paintingId;
    this.dataService.getBids(paintingId).subscribe({
      next: (response) => {this.bidsOfPainting = response;},
      error: (error) => {console.log(error);}
    });
  }
}
