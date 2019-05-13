import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    receiveUrl = 'http://localhost:8080/receive';
    useUrl = 'http://localhost:8080/use';
    aliveUrl = 'http://localhost:8080/receive/alive';
    // receiveUrl = 'https://spring-medicine-dispensary.herokuapp.com/receive';
    // useUrl = 'https://spring-medicine-dispensary.herokuapp.com/use';
    // aliveUrl = 'https://spring-medicine-dispensary.herokuapp.com/receive/alive';

    constructor(private http: HttpClient) { }

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

    deleteMedicine(options){
        return this.http.delete(this.receiveUrl, options);
    }

    undoUse(options){
        return this.http.delete(this.useUrl, options);
    }

    isAlive(){
        return this.http.get(this.aliveUrl, {responseType: 'text'});
    }

}
