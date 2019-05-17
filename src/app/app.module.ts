import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceiveComponent } from './receive/receive.component';
import { UseComponent } from './use/use.component';

import { HttpClientModule } from '@angular/common/http';
import { AllMedicineComponent } from './all-medicine/all-medicine.component';
import { AllUsesComponent } from './all-uses/all-uses.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeleteMedicineComponent } from './delete-medicine/delete-medicine.component';
import { UndoUseComponent } from './undo-use/undo-use.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ReceiveComponent,
    UseComponent,
    AllMedicineComponent,
    AllUsesComponent,
    DeleteMedicineComponent,
    UndoUseComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
