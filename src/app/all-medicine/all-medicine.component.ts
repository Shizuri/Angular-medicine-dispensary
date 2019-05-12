import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-all-medicine',
    templateUrl: './all-medicine.component.html',
    styleUrls: ['./all-medicine.component.css']
})
export class AllMedicineComponent implements OnInit {

    medicines: any[] = [];
    searchMed = new FormControl('');
    foundMeds: any[] = [];

    numberOfMedicines;
    hasSearchValue = false;

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllMedicine();
        this.listByMedicine();
    }

    getAllMedicine() {
        this.data.getAllMedicine()
            .subscribe(
                med => {
                    this.medicines = med;
                    this.numberOfMedicines = this.medicines.length;
                },
                error => {
                    console.log(`Error. Backend might be down`);
                });
    }

    listByMedicine() {
        this.searchMed.valueChanges.subscribe(med => {
            this.findMed(med);
        });
    }

    findMed(med: String) {
        this.foundMeds = [];
        this.hasSearchValue = false;

        if (med.trim()) {
            this.medicines.forEach(element => {
                if (element.medicineName.toLowerCase().includes(med.toLowerCase())
                || element.expirationDate.includes(med)) {
                    this.foundMeds.push(element);
                    this.hasSearchValue = true;
                }
            });
        }
    }
}
