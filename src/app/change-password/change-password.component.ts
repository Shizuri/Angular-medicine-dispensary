import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    errorMessage;
    confirmationMessage;
    doNotMatch;
    error;

    name = localStorage.getItem('name');

    changePasswordForm = new FormGroup({
        oldPassword: new FormControl(''),
        newPassword: new FormControl(''),
        repeatPassword: new FormControl(''),
    });

    constructor(private data: DataService) { }

    ngOnInit() {
    }

    onSubmit() {
        this.changePassword();
    }

    changePassword() {
        this.errorMessage = false; //for fade in
        this.confirmationMessage = false; //for fade in
        this.doNotMatch = false; //for fade in

        let form = this.changePasswordForm.value;
        form.name = this.name;
        console.log(form);

        if (this.changePasswordForm.value.newPassword != this.changePasswordForm.value.repeatPassword) {
            this.doNotMatch = true;
        } else {
            this.data.changePassword(form)
            .subscribe(
                res => {
                    // console.log(`Result: ${JSON.stringify(res)}`);

                    this.confirmationMessage = true;
                    this.errorMessage = false;
                    this.doNotMatch = false;
                },
                error => {
                    // console.log(`Error: ${JSON.stringify(error.error)}`);
                    this.error = JSON.stringify(error.error);

                    this.errorMessage = true;
                    this.confirmationMessage = false;
                    this.doNotMatch = false;
                }
            );
        }
    }

}
