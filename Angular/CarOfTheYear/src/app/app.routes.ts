import { Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { VoteComponent } from './components/vote/vote.component';

export const routes: Routes = [
    {path: '', component: CarListComponent},
    {path: 'voting/:id', component: VoteComponent}
];
