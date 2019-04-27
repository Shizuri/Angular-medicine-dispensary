import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { newMedicine } from '../newMedicine';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {

  quantity = new FormControl('');
  medicineName = new FormControl('');
  expirationDate = new FormControl('');

  constructor(private data: DataService) { }

  ngOnInit() {

  }

  addMedicine(){
    let medicine = new newMedicine;
    medicine.quantity = this.quantity.value;
    medicine.medicineName = this.medicineName.value;
    medicine.expirationDate = this.expirationDate.value;

    this.data.addMedicine(medicine);
    console.log(`clicked ${medicine}`)
  }

}
