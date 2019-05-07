import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
    selector: 'app-use',
    templateUrl: './use.component.html',
    styleUrls: ['./use.component.css']
})
export class UseComponent implements OnInit {

    errorMessage;
    confirmationMessage;
    medicines = [];
    selectedValue: any;

    useForm = new FormGroup({
        medicineName: new FormControl(''),
        expirationDate: new FormControl(''),
        patientName: new FormControl(''),
        dateOfAdministration: new FormControl('')

    });

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllMedicines();
    }

    onSubmit() {
        this.useMedicineUnpack();
    }

    useMedicineUnpack() {
        this.data.useMedicinePacked(this.useForm.value)
            .subscribe(data => {
                console.log('POST Request for useMedicine is successful', data);
                this.confirmationMessage = true;
                this.errorMessage = false;
            },
                error => {
                    console.log('Error with useMedicine', error);
                    // this.errorMessage = error.error;
                    this.confirmationMessage = false;
                    this.errorMessage = true;
                    console.log('Error Message:', this.errorMessage);
                });
    }

    getAllMedicines() {
        this.data.getAllMedicine()
            .subscribe(med => {
                this.medicines = med;
                // console.log(this.medicines);
            });
        // console.log(`medicinies: ${this.medicines}`);
    }

    doSomething(){
        this.useForm.patchValue({
            medicineName: this.selectedValue.medicineName,
            expirationDate: this.selectedValue.expirationDate
        });

        console.log(this.selectedValue);
    }

}
