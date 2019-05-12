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
    foundUses: any[] = [];

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
                    this.foundUses = use;
                },
                error => {
                    console.log(`Error. Backend might be down`);
                });
    }

    listByMedicineOrPatient() {
        this.searchMed.valueChanges.subscribe(med => {
            this.findMedicineOrPatient(med);
        });
    }

    findMedicineOrPatient(med: String) {
        this.foundUses = [];

        this.uses.forEach(element => {
            if (element.medicineName.toLowerCase().includes(med.toLowerCase())
                || element.patientName.toLowerCase().includes(med.toLowerCase())
                || element.expirationDate.includes(med)
                || element.dateOfAdministration.includes(med)) {
                this.foundUses.push(element);
            }
        });
    }
}
