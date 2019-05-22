import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UseComponent } from './use/use.component';
import { ReceiveComponent } from './receive/receive.component';
import { AllMedicineComponent } from './all-medicine/all-medicine.component';
import { AllUsesComponent } from './all-uses/all-uses.component';
import { DeleteMedicineComponent } from './delete-medicine/delete-medicine.component';
import { UndoUseComponent } from './undo-use/undo-use.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/use', pathMatch: 'full'},
  { path: 'use', component: UseComponent},
  { path: 'receive', component: ReceiveComponent},
  { path: 'all-medicine', component: AllMedicineComponent},
  { path: 'all-uses', component: AllUsesComponent},
  { path: 'delete-medicine', component: DeleteMedicineComponent},
  { path: 'undo-use', component: UndoUseComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'create-user', component: CreateUserComponent},
  { path: 'delete-user', component: DeleteUserComponent},
  { path: 'update-user', component: UpdateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
