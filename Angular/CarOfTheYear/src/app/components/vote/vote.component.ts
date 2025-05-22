import { Component } from '@angular/core';
import { CarModel } from '../../models/car.model';
import { DataService } from '../../services/data.service';
import { VoteModel } from '../../models/vote.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vote',
  imports: [FormsModule, RouterLink],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css'
})
export class VoteComponent {
  cars: CarModel[] = [];
  vote: VoteModel = {
    carId: 0,
    comment: '',
    email: ''
  };
  acceptedConditions = false;
  errorMessage = '';
  successMessage = '';

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vote.carId = Number(params['id']);
    });

    this.dataService.getCars().subscribe({
      next: (response) => {this.cars = response;},
      error: (error) => { console.log(error); }
    });
  }

  addVote() {
    if (!this.acceptedConditions) {
      this.successMessage = '';
      this.errorMessage = "Please accept the terms of use!";
      return;
    }
    if (this.vote.carId === 0 || this.vote.email === '') {
      this.successMessage = '';
      this.errorMessage = "Please fill in all the fields!";
      return;
    }
    this.dataService.postVote(this.vote).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
      },
      error: (error) => { 
        this.errorMessage = error.error.message || error.message; 
        this.successMessage = '';
      }
    });
  }

}
