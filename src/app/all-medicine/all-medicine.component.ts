import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-all-medicine',
  templateUrl: './all-medicine.component.html',
  styleUrls: ['./all-medicine.component.css']
})
export class AllMedicineComponent implements OnInit {

  medicines;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.getAllMedicine();
  }

  getAllMedicine(){
    this.data.getAllMedicine()
      .subscribe(med =>{
        this.medicines = med;
      });
  }

}
