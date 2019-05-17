import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loggedIn; //login

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
}
