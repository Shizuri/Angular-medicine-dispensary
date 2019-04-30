import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-use',
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.css']
})
export class UseComponent implements OnInit {

  // useMed$;

  useForm = new FormGroup({
    medicineName: new FormControl(''),
    expirationDate: new FormControl(''),
    patientName: new FormControl(''),
    dateOfAdministration: new FormControl('')

  });

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(this.useForm.value);
    this.useMedicine();
    // console.log('this.blah: ', this.useMed$);
    // console.log('errorMessage:', this.useMed$.error);
  }

  useMedicine(){
    this.data.useMedicine(this.useForm.value);
  }

}
