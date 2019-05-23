import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

    errorMessage;
    confirmationMessage;

    createUserForm = new FormGroup({
        name: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        role: new FormControl('USER'),
        active: new FormControl(true),
    });

    constructor(private data: DataService) { }

    ngOnInit() {
    }

    createUser() {
        this.errorMessage = false; //for fade in
        this.confirmationMessage = false; //for fade in

        this.data.createUser(this.createUserForm.value)
            .subscribe(
                res => {
                    // console.log(`Result: ${JSON.stringify(res)}`);
                    this.confirmationMessage = true;
                    this.errorMessage = false;
                },
                error => {
                    // console.log(`Error: ${JSON.stringify(error.error)}`);
                    this.errorMessage = true;
                    this.confirmationMessage = false;
                }
            );
    }

}
