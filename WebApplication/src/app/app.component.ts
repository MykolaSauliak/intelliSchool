import { Component, OnInit } from '@angular/core';
import { IQuestion, IAnswered } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title:string;
  ngOnInit(){
    this.title = 'IntelliSchool';
  }








}
