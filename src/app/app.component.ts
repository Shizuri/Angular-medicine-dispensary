import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loggedIn; //for login
    role; //for user
    name; //for user

    alive;
    errorMessage;

    constructor(private data: DataService) { }

    ngOnInit() {
        this.isAlive(); // check if backend is alive

        this.data.currentLoggedIn.subscribe(res => this.loggedIn = res); //for login

        //so that you don't "log out" on refre
        if (localStorage.getItem('state') == 'true') {
            this.data.on();
        } else {
            this.data.off();
        }

        this.getRoleAndName();
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

    logOut() {
        this.data.logOut();
    }

    getRoleAndName() {
        this.role = localStorage.getItem('role');
        this.name = localStorage.getItem('name');
    }

    // overlay

    on() {
        document.getElementById("overlay").style.display = "block";
    }

    off() {
        document.getElementById("overlay").style.display = "none";
    }
}
