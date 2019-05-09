import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    // receiveUrl = 'http://localhost:8080/receive';
    // useUrl = 'http://localhost:8080/use';
    receiveUrl = 'https://spring-medicine-dispensary.herokuapp.com/receive';
    useUrl = 'https://spring-medicine-dispensary.herokuapp.com/use';

    constructor(private http: HttpClient) { }

    getAllMedicine(): Observable<any[]> {
        return this.http.get<any[]>(this.receiveUrl);
    }

    getAllUses() {
        return this.http.get(this.useUrl);
    }

    // addMedicine(medicine) {
    //     return this.http.post(this.receiveUrl, medicine)
    //         .subscribe(data => {
    //             console.log('POST Request for addMedicine is successful', data);
    //         },
    //             error => {
    //                 console.log('Error with addMedicine', error);
    //             }
    //         );
    // }

    addMedicinePacked(medicine) {
        return this.http.post(this.receiveUrl, medicine);
    }

    // useMedicine(medicine) {
    //     return this.http.post(this.useUrl, medicine)
    //         .subscribe(data => {
    //             console.log('POST Request for useMedicine is successful', data);
    //         },
    //             error => {
    //                 console.log('Error with useMedicine', error);
    //             }
    //         );
    // }

    useMedicinePacked(medicine) {
        return this.http.post(this.useUrl, medicine);
    }

    deleteMedicine(options){
        return this.http.delete(this.receiveUrl, options);
    }

}
