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

    loggedIn; //login

    errorMessage;
    confirmationMessage;

    loginForm = new FormGroup({
        name: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
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

    // logIn(){
    //     this.data.logIn(this.loginForm.value);
    // }

    logIn(){
        this.data.logIn2(this.loginForm.value)
        .subscribe(
            res => {
                console.log(`Result: ${res}`);
                this.data.on();
                localStorage.setItem('state', 'true');
                this.confirmationMessage = true;
                this.errorMessage = false;
            },
            error =>{
                console.log(`Error: ${JSON.stringify(error.error)}`);
                this.data.off();
                this.errorMessage = true;
                this.confirmationMessage = false;
            }
        );
    }

}