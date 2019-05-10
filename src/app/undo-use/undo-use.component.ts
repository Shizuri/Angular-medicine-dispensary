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
    uses= [];
    selectedValue: any;

    undoForm = new FormGroup({
        medicineName: new FormControl(''),
        expirationDate: new FormControl(''),
        patientName: new FormControl(''),
        dateOfAdministration: new FormControl(''),
    });

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllUses();
    }

    onSubmit() {
        this.undoUse();
    }

    undoUse() {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: this.undoForm.value
          }

        this.data.undoUse(options)
            .subscribe(
                data => {
                    console.log('DELETE Request for UNDO USE is successful', data);
                    this.confirmationMessage = true;
                    this.errorMessage = false;
                },
                error => {
                    console.log('Error with Undo Use', error);
                    this.confirmationMessage = false;
                    this.errorMessage = true;
                });
    }

    getAllUses() {
        this.data.getAllUses()
        .subscribe(
            uses =>{
                this.uses = uses;
            },
            error =>{
                console.log(`Error: ${JSON.stringify(error)}`);
            }
        )
    }

    inputUseMedicineValues() {
        this.undoForm.patchValue({
            medicineName: this.selectedValue.medicineName,
            expirationDate: this.selectedValue.expirationDate,
            patientName: this.selectedValue.patientName,
            dateOfAdministration: this.selectedValue.dateOfAdministration
        });
    }

    // TODO: Make a search dropdown menu
}
