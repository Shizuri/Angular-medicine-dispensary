import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-all-uses',
  templateUrl: './all-uses.component.html',
  styleUrls: ['./all-uses.component.css']
})
export class AllUsesComponent implements OnInit {

  uses;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.getAllUses();
  }

  getAllUses(){
    this.data.getAllUses()
    .subscribe(use =>{
      this.uses = use;
    });
  }
}
