import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { newMedicine } from '../newMedicine';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {

  medicineForm = new FormGroup({
    quantity: new FormControl(''),
    medicineName: new FormControl(''),
    expirationDate: new FormControl('')
  });


  constructor(private data: DataService) { }

  ngOnInit() {

  }

  onSubmit() {
    console.warn(this.medicineForm.value);
    this.addMedicine();
  }

  addMedicine() {
    this.data.addMedicine(this.medicineForm.value);
  }

}
