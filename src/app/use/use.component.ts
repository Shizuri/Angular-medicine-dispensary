import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-use',
    templateUrl: './use.component.html',
    styleUrls: ['./use.component.css']
})
export class UseComponent implements OnInit {

    today;
    errorMessage;
    confirmationMessage;
    medicines = [];

    searchBar = new FormControl(''); //for search component
    foundBar = new FormControl(''); //for search component
    foundMeds: any[] = []; //for search component

    useForm = new FormGroup({
        medicineName: new FormControl(''),
        expirationDate: new FormControl(''),
        patientName: new FormControl(''),
        dateOfAdministration: new FormControl('')

    });

    constructor(private data: DataService, private datePipe: DatePipe) { }

    ngOnInit() {
        this.getAllMedicines();
        this.getToday();
        this.listByMedicine();
    }

    onSubmit() {
        this.errorMessage = false; //for fade in
        this.confirmationMessage = false; //for fade in

        this.useMedicine();
    }

    useMedicine() {
        this.data.useMedicine(this.useForm.value)
            .subscribe(
                data => {
                    this.confirmationMessage = true;
                    this.errorMessage = false;
                },
                error => {
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

    getToday() {
        this.today = this.datePipe.transform(new Date(), "yyyy-MM-dd");
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
        this.useForm.patchValue({
            medicineName: this.foundBar.value.medicineName,
            expirationDate: this.foundBar.value.expirationDate
        });
    }
}
