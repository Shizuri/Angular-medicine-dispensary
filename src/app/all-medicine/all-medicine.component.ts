import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { tap, mergeMap } from 'rxjs/operators';

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
            this.find(med);
        });
    }

    find(med:String) {
        this.newMeds = [];

        if(med.trim()){
            for(let i = 0; i < this.medicines.length; i++){
                if(this.medicines[i].medicineName.toLowerCase().includes(med.toLowerCase())){
                    this.newMeds.push(this.medicines[i]);
                }
            }
        }
    }
}
