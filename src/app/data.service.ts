import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    receiveUrl = 'http://localhost:8080/receive';
    useUrl = 'http://localhost:8080/use';
    // errorMessage;

    constructor(private http: HttpClient) { }

    getAllMedicine(): Observable<any[]> {
        return this.http.get<any[]>(this.receiveUrl);
    }

    getAllUses() {
        return this.http.get(this.useUrl);
    }

    addMedicine(medicine) {
        return this.http.post(this.receiveUrl, medicine)
            .subscribe(data => {
                console.log('POST Request for addMedicine is successful', data);
            },
                error => {
                    console.log('Error with addMedicine', error);
                }
            );
    }

    useMedicine(medicine) {
        return this.http.post(this.useUrl, medicine)
            .subscribe(data => {
                console.log('POST Request for useMedicine is successful', data);
            },
                error => {
                    console.log('Error with useMedicine', error);

                    // this.errorMessage = error.error;
                    // console.log('Error Message:', this.errorMessage);
                }
            );
    }

    useMedicinePacked(medicine) {
        return this.http.post(this.useUrl, medicine);
    }


    // useMedicine(medicine) {
    //   return this.http.post(this.useUrl, medicine)
    //     .pipe(
    //       catchError(this.handleError)
    //     );
    // }

    // private handleError(error: HttpErrorResponse) {
    //   if (error.error instanceof ErrorEvent) {
    //     // A client-side or network error occurred. Handle it accordingly.
    //     console.error('An error occurred:', error.error.message);
    //   } else {
    //     // The backend returned an unsuccessful response code.
    //     // The response body may contain clues as to what went wrong,
    //     console.error(
    //       `Backend returned code ${error.status}, ` +
    //       `body was: ${error.error}`);
    //   }
    //   // return an observable with a user-facing error message
    //   return throwError(
    //     'Something bad happened; please try again later.');
    // };

}
