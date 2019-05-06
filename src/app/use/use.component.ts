import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
    selector: 'app-use',
    templateUrl: './use.component.html',
    styleUrls: ['./use.component.css']
})
export class UseComponent implements OnInit {

    errorMessage; //make it a general message; Look at refactoring the whole system with sending observables and providing messages
    medicines = [];
    selectedValue: any;

    useForm = new FormGroup({
        medicineName: new FormControl(''),
        expirationDate: new FormControl(''),
        patientName: new FormControl(''),
        dateOfAdministration: new FormControl('')

    });

    findMedicine = new FormControl('');

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllMedicines();
    }

    onSubmit() {
        // this.useMedicine();
        this.useMedicineUnpack();
    }

    // useMedicine() {
    //     let bob = this.data.useMedicine(this.useForm.value);
    //     console.log('bob: ', bob);
    // }

    useMedicineUnpack() {//THIS WORKS!!!!
        this.data.useMedicinePacked(this.useForm.value)
            .subscribe(data => {
                console.log('POST Request for useMedicine is successful', data);
            },
                error => {
                    console.log('Error with useMedicine', error);

                    this.errorMessage = error.error;
                    console.log('Error Message:', this.errorMessage);
                });
    }

    getAllMedicines() {
        this.data.getAllMedicine()
            .subscribe(med => {
                this.medicines = med;
                console.log(this.medicines);
            });
        console.log(`medicinies: ${this.medicines}`);
    }

    doSomething(){
        this.useForm.patchValue({
            medicineName: this.selectedValue.medicineName,
            expirationDate: this.selectedValue.expirationDate
        });

        console.log(this.selectedValue);
    }

}
