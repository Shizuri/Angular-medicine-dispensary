import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    private loggedIn = new BehaviorSubject<boolean>(false); //for login
    currentLoggedIn = this.loggedIn.asObservable(); //for login

    // private role = new BehaviorSubject<string>('USER'); //for login
    // currentRole = this.role.asObservable(); //for login

    receiveUrl = 'http://localhost:8080/receive';
    useUrl = 'http://localhost:8080/use';
    aliveUrl = 'http://localhost:8080/receive/alive';
    loginUrl = 'http://localhost:8080/users/login';
    // receiveUrl = 'https://spring-medicine-dispensary.herokuapp.com/receive';
    // useUrl = 'https://spring-medicine-dispensary.herokuapp.com/use';
    // aliveUrl = 'https://spring-medicine-dispensary.herokuapp.com/receive/alive';

    constructor(private http: HttpClient) { }

    // logIn(user) { //for login
    //     this.http.post(this.loginUrl, user)
    //         .subscribe(
    //             res => {
    //                 console.log(`Result: ${res}`);
    //                 this.loggedIn.next(true);
    //                 localStorage.setItem('state', 'true');
    //             },
    //             error => {
    //                 console.log(`Error: ${JSON.stringify(error.error)}`);
    //                 this.loggedIn.next(false);
    //             }
    //         );
    // }

    logIn(user):Observable<any> { //for login
        return this.http.post(this.loginUrl, user);
    }

    logOut() { //for login
        this.loggedIn.next(false);
        localStorage.setItem('state', 'false');
        localStorage.setItem('role', 'USER');
    }

    stateOfLogin(): any { //for login
        let state = localStorage.getItem('state');
        let role = localStorage.getItem('role');
        console.log(`state of login: ${state}`);
        console.log(`role of user : ${role}`);
        return state;
    }

    // setRole(role){
    //     this.role.next(role.role);
    // }

    on() { //for login
        this.loggedIn.next(true);
    }

    off() { //for login
        this.loggedIn.next(false);
    }

    getAllMedicine(): Observable<any[]> {
        return this.http.get<any[]>(this.receiveUrl);
    }

    getAllUses() {
        return this.http.get<any[]>(this.useUrl);
    }

    addMedicine(medicine) {
        return this.http.post(this.receiveUrl, medicine);
    }

    useMedicine(medicine) {
        return this.http.post(this.useUrl, medicine);
    }

    deleteMedicine(options) {
        return this.http.delete(this.receiveUrl, options);
    }

    undoUse(options) {
        return this.http.delete(this.useUrl, options);
    }

    isAlive() {
        return this.http.get(this.aliveUrl, { responseType: 'text' });
    }

}
