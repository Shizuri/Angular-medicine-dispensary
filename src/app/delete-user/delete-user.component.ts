import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

    errorMessage;
    confirmationMessage;
    users = [];

    searchBar = new FormControl(''); //for search component
    foundBar = new FormControl(''); //for search component
    foundUsers: any[] = []; //for search component

    deleteUserForm = new FormGroup({
        name: new FormControl(''),
    });

    constructor(private data: DataService) { }

    ngOnInit() {
        this.getAllUsers();
        this.listByUser();
    }

    onSubmit() {
        this.deleteUser();
    }

    deleteUser() {
        if (confirm("Are you sure to delete this user?")) {
            this.errorMessage = false; //for fade in
            this.confirmationMessage = false; //for fade in

            const options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                body: this.deleteUserForm.value.name
            }

            this.data.deleteUser(options)
                .subscribe(
                    data => {
                        this.confirmationMessage = true;
                        this.errorMessage = false;
                    },
                    error => {
                        this.confirmationMessage = false;
                        this.errorMessage = true;
                    });
        }

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
        this.deleteUserForm.patchValue({
            name: this.foundBar.value.name,
            role: this.foundBar.value.role,
            active: this.foundBar.value.active
        });
    }

}
