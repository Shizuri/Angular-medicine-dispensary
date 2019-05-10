import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-all-uses',
    templateUrl: './all-uses.component.html',
    styleUrls: ['./all-uses.component.css']
})
export class AllUsesComponent implements OnInit {

    uses: any[] = [];
    searchMed = new FormControl('');
    newUses: any[] = [];

    numberOfUses;
    hasSearchValue = false;
    loaded = false;
    errorMessage;

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllUses();
        this.listByMedicineOrPatient();
    }

    getAllUses() {
        this.data.getAllUses()
            .subscribe(
                use => {
                    this.uses = use;
                    this.numberOfUses = this.uses.length;
                    this.loaded = true;
                },
                error => {
                    this.errorMessage = JSON.stringify(error);
                    this.loaded = false;
                });
    }

    listByMedicineOrPatient() {
        this.searchMed.valueChanges.subscribe(med => {
            this.findMedicineOrPatient(med);
        });
    }

    findMedicineOrPatient(med: String) {
        this.newUses = [];
        this.hasSearchValue = false;

        if (med.trim()) {
            this.uses.forEach(element => {
                if (element.medicineName.toLowerCase().includes(med.toLowerCase())
                    || element.patientName.toLowerCase().includes(med.toLowerCase())) {
                    this.newUses.push(element);
                    this.hasSearchValue = true;
                }
            });
        }
    }
}
