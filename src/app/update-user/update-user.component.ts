import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

    errorMessage;
    confirmationMessage;
    users = [];

    searchBar = new FormControl(''); //for search component
    foundBar = new FormControl(''); //for search component
    foundUsers: any[] = []; //for search component

    updateUserForm = new FormGroup({
        name: new FormControl(''),
        newName: new FormControl(''),
        role: new FormControl('USER'),
        active: new FormControl(''),
    });

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllUsers();
        this.listByUser();
    }

    onSubmit() {
        this.updateUser();
    }

    updateUser(){
        this.errorMessage = false; //for fade in
        this.confirmationMessage = false; //for fade in

        this.data.updateUser(this.updateUserForm.value)
        .subscribe(
            res => {
                console.log(`Result: ${JSON.stringify(res)}`);

                this.confirmationMessage = true;
                this.errorMessage = false;
            },
            error => {
                console.log(`Error: ${JSON.stringify(error.error)}`);

                this.errorMessage = true;
                this.confirmationMessage = false;
            }
        );

    }

    getAllUsers() {
        this.data.getAllUsers()
            .subscribe(users => {
                this.users = users;
                this.foundUsers = users; // fill filter data for search on load
            });
    }

    listByUser() {
        this.searchBar.valueChanges.subscribe(user => {
            this.fundUser(user);
        });
    }

    fundUser(user: String) {
        this.foundUsers = [];

        this.users.forEach(element => {
            if (element.name.toLowerCase().includes(user.toLowerCase())) {
                this.foundUsers.push(element);
            }
        });
    }

    injectUserToForm() {
        this.updateUserForm.patchValue({
            name: this.foundBar.value.name,
            newName : this.foundBar.value.name,
            role: this.foundBar.value.role,
            active: this.foundBar.value.active
        });
    }

}
