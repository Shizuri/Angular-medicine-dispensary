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
    newMeds;

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllMedicine();
        this.test();
    }

    getAllMedicine() {
        this.data.getAllMedicine()
            .subscribe(med => {
                this.medicines = med;
            });
    }

    listByMedicine(med) {

    }

    // searchMeds() {
    //   this.searchMed.valueChanges
    //     .pipe()
    // }
    // under contstruction

    test() {
        let bob = this.searchMed.valueChanges.subscribe(med => this.newMeds = med);
    }
}
