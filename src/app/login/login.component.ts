import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loggedIn; // for login

    errorMessage;
    confirmationMessage;
    inactiveUser;

    loginForm = new FormGroup({
        name: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private data: DataService) { }

    ngOnInit() {
        this.data.currentLoggedIn.subscribe(res => this.loggedIn = res); //login
    }

    onSubmit() {
        this.errorMessage = false; //for fade in
        this.confirmationMessage = false; //for fade in

        this.logIn();
    }

    logIn() {
        this.data.logIn(this.loginForm.value)
            .subscribe(
                res => {
                    // console.log(`Result: ${JSON.stringify(res)}`);
                    if (res.active == true) {
                        this.data.on();

                        localStorage.setItem('state', 'true');
                        localStorage.setItem('role', res.role);
                        localStorage.setItem('name', res.name);

                        this.confirmationMessage = true;
                        this.errorMessage = false;
                        this.inactiveUser = false;

                        window.location.reload(); // needed to update values before displaying the main page
                    }

                    if(res.active == false){
                        this.inactiveUser = true;
                        this.errorMessage = false;
                        this.confirmationMessage = false;
                    }

                },
                error => {
                    // console.log(`Error: ${JSON.stringify(error.error)}`);
                    this.data.off();

                    this.errorMessage = true;
                    this.confirmationMessage = false;
                    this.inactiveUser = false;
                }
            );
    }

}
