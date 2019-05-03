import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-all-medicine',
    templateUrl: './all-medicine.component.html',
    styleUrls: ['./all-medicine.component.css']
})
export class AllMedicineComponent implements OnInit {

    medicines;
    searchMed = new FormControl('');
    newMeds: any[] = [];
    loaded = false;

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllMedicine();
        this.listByMedicine();
    }

    getAllMedicine() {
        this.data.getAllMedicine()
            .subscribe(med => {
                this.medicines = med;
            });
        this.loaded = true;
    }

    listByMedicine() {
        this.searchMed.valueChanges.subscribe(med => {
            this.findMed(med);
        });
    }

    findMed(med: String) {
        this.newMeds = [];

        if (med.trim()) {
            this.medicines.forEach(element => {
                if (element.medicineName.toLowerCase().includes(med.toLowerCase())) {
                    this.newMeds.push(element);
                }
            });
        }
    }
}
