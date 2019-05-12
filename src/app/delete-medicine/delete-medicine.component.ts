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

    searchBar = new FormControl(''); //for search component
    foundBar = new FormControl(''); //for search component
    foundMeds: any[] = []; //for search component

    deleteForm = new FormGroup({
        medicineName: new FormControl(''),
        expirationDate: new FormControl(''),
        quantity: new FormControl(''),
    });

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllMedicines();
        this.listByMedicine();
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
                this.foundMeds = med; // fill filter data for search on load
            });
    }

    // search and filter code from here
    listByMedicine() {
        this.searchBar.valueChanges.subscribe(med => {
            this.findMed(med);
        });
    }

    findMed(med: String) {
        this.foundMeds = [];

        this.medicines.forEach(element => {
            if (element.medicineName.toLowerCase().includes(med.toLowerCase())
                || element.expirationDate.includes(med)) {
                this.foundMeds.push(element);
            }
        });
    }

    injectMedicineToForm() {
        this.deleteForm.patchValue({
            medicineName: this.foundBar.value.medicineName,
            expirationDate: this.foundBar.value.expirationDate
        });
    }

}
