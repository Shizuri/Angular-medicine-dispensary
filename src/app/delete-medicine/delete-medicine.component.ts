import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-delete-medicine',
    templateUrl: './delete-medicine.component.html',
    styleUrls: ['./delete-medicine.component.css']
})
export class DeleteMedicineComponent implements OnInit {

    errorMessage;
    confirmationMessage;
    medicines = [];
    selectedValue: any;

    deleteForm = new FormGroup({
        medicineName: new FormControl(''),
        expirationDate: new FormControl(''),
        quantity: new FormControl(''),
    });

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllMedicines();
    }

    onSubmit() {
        this.deleteMedicine();
    }

    deleteMedicine() {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: this.deleteForm.value
          }

        // console.log(`delete json is: ${this.deleteForm.value}`);
        // console.log(JSON.stringify(this.deleteForm.value));
        this.data.deleteMedicine(options)
            .subscribe(
                data => {
                    console.log('DELETE Request for deleteMedicine is successful', data);
                    this.confirmationMessage = true;
                    this.errorMessage = false;
                },
                error => {
                    console.log('Error with deleteMedicine', error);
                    this.confirmationMessage = false;
                    this.errorMessage = true;
                });
    }

    getAllMedicines() {
        this.data.getAllMedicine()
            .subscribe(med => {
                this.medicines = med;
                // console.log(this.medicines);
            });
        // console.log(`medicinies: ${this.medicines}`);
    }

    inputMedicineValues() {
        this.deleteForm.patchValue({
            medicineName: this.selectedValue.medicineName,
            expirationDate: this.selectedValue.expirationDate
        });

        // console.log(this.selectedValue);
    }

}
