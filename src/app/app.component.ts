import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loggedIn; //login
    role; //login

    alive;
    errorMessage;

    constructor(private data: DataService) { }

    ngOnInit() {
        this.isAlive();

        this.data.currentLoggedIn.subscribe(res => this.loggedIn = res); //login
        if(this.data.stateOfLogin() == 'true'){
            this.data.on();
        } else {
            this.data.off();
        }
        // this.data.currentRole.subscribe(res => this.role = res); //login

        this.getRole();
    }

    isAlive() {
        this.data.isAlive().subscribe(
            res => {
                this.alive = res;
            },
            error => {
                this.errorMessage = JSON.stringify(error);
            });
    }

    logOut(){
        this.data.logOut();
    }

    getRole(){
        this.role = localStorage.getItem('role');
    }
}
