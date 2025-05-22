import { Routes } from '@angular/router';
import { PaintingListComponent } from './components/painting-list/painting-list.component';
import { NewBidComponent } from './components/new-bid/new-bid.component';

export const routes: Routes = [
    {path: '', component: PaintingListComponent},
    {path: 'bidding/:id', component: NewBidComponent},
];
