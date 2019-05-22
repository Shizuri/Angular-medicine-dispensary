import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-undo-use',
    templateUrl: './undo-use.component.html',
    styleUrls: ['./undo-use.component.css']
})
export class UndoUseComponent implements OnInit {

    errorMessage;
    confirmationMessage;
    uses = [];

    searchBar = new FormControl(''); //for search component
    foundBar = new FormControl(''); //for search component
    foundUses: any[] = []; //for search component

    undoForm = new FormGroup({
        medicineName: new FormControl(''),
        expirationDate: new FormControl(''),
        patientName: new FormControl(''),
        dateOfAdministration: new FormControl(''),
    });

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllUses();
        this.listByUse();
    }

    onSubmit() {
        this.errorMessage = false; //for fade in
        this.confirmationMessage = false; //for fade in

        this.undoUse();
    }

    undoUse() {
        if (confirm("Are you sure to undo the use of this medicine?")) {
            const options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                body: this.undoForm.value
            }

            this.data.undoUse(options)
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
    }

    getAllUses() {
        this.data.getAllUses()
            .subscribe(
                uses => {
                    this.uses = uses;
                    this.foundUses = uses; // fill filter data for search on load
                },
                error => {
                    console.log(`Error: ${JSON.stringify(error)}`);
                }
            )
    }

    // search and filter code from here
    listByUse() {
        this.searchBar.valueChanges.subscribe(use => {
            this.findUse(use);
        });
    }

    findUse(use: String) {
        this.foundUses = [];

        this.uses.forEach(element => {
            if (element.medicineName.toLowerCase().includes(use.toLowerCase())
                || element.expirationDate.includes(use)
                || element.patientName.toLowerCase().includes(use.toLocaleLowerCase())
                || element.dateOfAdministration.includes(use)) {
                this.foundUses.push(element);
            }
        });
    }

    injectMedicineToForm() {
        this.undoForm.patchValue({
            medicineName: this.foundBar.value.medicineName,
            expirationDate: this.foundBar.value.expirationDate,
            patientName: this.foundBar.value.patientName,
            dateOfAdministration: this.foundBar.value.dateOfAdministration
        });
    }
}
