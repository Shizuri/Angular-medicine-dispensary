import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-all-medicine',
    templateUrl: './all-medicine.component.html',
    styleUrls: ['./all-medicine.component.css']
})
export class AllMedicineComponent implements OnInit {

    loggedIn; //login

    medicines: any[] = [];
    searchMed = new FormControl('');
    foundMeds: any[] = [];

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllMedicine();
        this.listByMedicine();
        this.data.currentLoggedIn.subscribe(res => this.loggedIn = res); //logi

    }

    getAllMedicine() {
        this.data.getAllMedicine()
            .subscribe(
                med => {
                    this.medicines = med;
                    this.foundMeds = med;
                },
                error => {
                    // console.log(`Error. Backend might be down`);
                });
    }

    listByMedicine() {
        this.searchMed.valueChanges.subscribe(med => {
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
}
