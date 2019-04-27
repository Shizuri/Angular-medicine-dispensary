import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UseComponent } from './use/use.component';
import { ReceiveComponent } from './receive/receive.component';
import { AllMedicineComponent } from './all-medicine/all-medicine.component';
import { AllUsesComponent } from './all-uses/all-uses.component';

const routes: Routes = [
  { path: '', redirectTo: '/use', pathMatch: 'full'},
  { path: 'use', component: UseComponent},
  { path: 'receive', component: ReceiveComponent},
  { path: 'all-medicine', component: AllMedicineComponent},
  { path: 'all-uses', component: AllUsesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
