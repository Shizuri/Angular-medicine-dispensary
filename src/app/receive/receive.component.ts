import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-receive',
    templateUrl: './receive.component.html',
    styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {

    today;
    errorMessage;
    confirmationMessage;

    medicineForm = new FormGroup({
        quantity: new FormControl('', Validators.required),
        medicineName: new FormControl('', Validators.required),
        expirationDate: new FormControl('', Validators.required)
    });

    constructor(private data: DataService, private datePipe: DatePipe) { }

    ngOnInit() {
        this.getToday();
    }

    onSubmit() {
        console.warn(this.medicineForm.value);
        console.log(this.today);
        this.addMedicine();
    }

    // addMedicine() {
    //     this.data.addMedicine(this.medicineForm.value);
    // }

    addMedicine() {
        this.data.addMedicinePacked(this.medicineForm.value)
            .subscribe(data => {
                console.log('POST Request for addMedicine is successful', data);
                this.confirmationMessage = true;
                this.errorMessage = false;
            },
                error => {
                    console.log('Error with addMedicine', error);
                    this.confirmationMessage = false;
                    this.errorMessage = true;
                }
            );
    }

    getToday() {
        this.today = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    }

}
