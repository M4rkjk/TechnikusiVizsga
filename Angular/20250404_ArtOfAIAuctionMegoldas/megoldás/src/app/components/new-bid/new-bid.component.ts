import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BidModel } from '../../models/bid.model';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new-bid',
  imports: [FormsModule, RouterLink],
  templateUrl: './new-bid.component.html',
  styleUrl: './new-bid.component.css',
})
export class NewBidComponent {
  acceptedConditions: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  bid: BidModel = {
    email: '',
    price: 0,
    paintingId: 0,
  };

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.route.params.subscribe((params) => {
      this.bid.paintingId = params['id'];
    });
  }

  sendOffer() {
    if (!this.acceptedConditions) {
      this.errorMessage = 'Please accept the terms of use!';
      this.successMessage = '';
      return;
    }
    this.dataService.postBid(this.bid).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.error.message || error.message;
        this.successMessage = '';
      },
    });
  }
}
