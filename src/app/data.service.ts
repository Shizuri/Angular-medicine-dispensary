import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    private loggedIn = new BehaviorSubject<boolean>(false); //for login
    currentLoggedIn = this.loggedIn.asObservable(); //for login

    receiveUrl = 'http://localhost:8080/receive';
    useUrl = 'http://localhost:8080/use';
    aliveUrl = 'http://localhost:8080/receive/alive';
    usersUrl = 'http://localhost:8080/users';
    createUserUrl = 'http://localhost:8080/users/create';
    changePasswordUrl = 'http://localhost:8080/users/change';

    // URLs for Heroku deploy
    // receiveUrl = 'https://spring-medicine-dispensary.herokuapp.com/receive';
    // useUrl = 'https://spring-medicine-dispensary.herokuapp.com/use';
    // aliveUrl = 'https://spring-medicine-dispensary.herokuapp.com/receive/alive';
    // usersUrl = 'https://spring-medicine-dispensary.herokuapp.com/users';
    // createUserUrl = 'https://spring-medicine-dispensary.herokuapp.com/users/create';
    // changePasswordUrl = 'https://spring-medicine-dispensary.herokuapp.com/users/change';

    constructor(private http: HttpClient) { }

    logIn(user):Observable<any> { //for login
        return this.http.post(this.usersUrl, user);
    }

    logOut() { //for login
        this.loggedIn.next(false);
        localStorage.setItem('state', 'false');
        localStorage.setItem('role', 'USER');
        localStorage.setItem('name', '');
    }

    on() { //for login
        this.loggedIn.next(true);
    }

    off() { //for login
        this.loggedIn.next(false);
    }

    //users
    createUser(newUser){
        return this.http.post(this.createUserUrl , newUser);
    }

    getAllUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.usersUrl);
    }

    deleteUser(options) {
        return this.http.delete(this.usersUrl, options);
    }

    updateUser(user): Observable<any>{
        return this.http.put(this.usersUrl, user);
    }

    changePassword(newPass){
        return this.http.put(this.changePasswordUrl, newPass);
    }

    //medicine
    getAllMedicine(): Observable<any[]> {
        return this.http.get<any[]>(this.receiveUrl);
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

    //uses
    getAllUses() {
        return this.http.get<any[]>(this.useUrl);
    }

    undoUse(options) {
        return this.http.delete(this.useUrl, options);
    }

    isAlive() {
        return this.http.get(this.aliveUrl, { responseType: 'text' });
    }

}
