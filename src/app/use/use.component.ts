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

    useForm = new FormGroup({
        medicineName: new FormControl(''),
        expirationDate: new FormControl(''),
        patientName: new FormControl(''),
        dateOfAdministration: new FormControl('')

    });

    constructor(private data: DataService) { }

    ngOnInit() {
    }

    onSubmit() {
        // this.useMedicine();
        this.useMedicineUnpack();
    }

    useMedicine() {
        let bob = this.data.useMedicine(this.useForm.value);
        console.log('bob: ', bob);
    }

    useMedicineUnpack(){//THIS WORKS!!!!
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

}
