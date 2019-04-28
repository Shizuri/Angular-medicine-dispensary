import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newMedicine } from './newMedicine';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  receiveUrl = 'http://localhost:8080/receive';
  useUrl = 'http://localhost:8080/use';

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
        console.log("POST Request is successful", data);
      },
        error => {
          console.log("Error", error);
        }
      );
  }

}
