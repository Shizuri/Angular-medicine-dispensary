import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    alive;
    errorMessage;

    constructor(private data: DataService) { }

    ngOnInit() {
        this.isAlive();
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
}
