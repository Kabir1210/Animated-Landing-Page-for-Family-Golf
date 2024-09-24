import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { LayoutVisualizationComponent } from './layout-visualization/layout-visualization.component';

interface People { 
  firstname?: string; 
  lastname?: string; 
  age?: string; 
} 
@Component({
  selector: 'app-control',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
  
})


export class ControlComponent implements OnInit{
  tableData: People[] = []; 
  cols: any[] = []; 
  constructor() { } 

  ngOnInit() { 
      this.cols = [ 
          { 
              field: 'firstname', 
              header: 'First Name'
          }, 
          { 
              field: 'lastname', 
              header: 'Last Name'
          }, 
          { 
              field: 'age', 
              header: 'Age'
          }, 
      ]; 
      this.tableData = [ 
          { 
              firstname: 'David', 
              lastname: 'ace', 
              age: '40', 
          }, 
          { 
              firstname: 'AJne', 
              lastname: 'west', 
              age: '40', 
          }, 
          { 
              firstname: 'Mak', 
              lastname: 'Lame', 
              age: '40', 
          }, 
          { 
              firstname: 'Peter', 
              lastname: 'raw', 
              age: '40', 
          }, 
          { 
              firstname: 'Kane', 
              lastname: 'James', 
              age: '40', 
          }, 
          { 
              firstname: 'Peter', 
              lastname: 'raw', 
              age: '40', 
          }, 
          { 
              firstname: 'Kane', 
              lastname: 'James', 
              age: '40', 
          }, 
          { 
              firstname: 'Peter', 
              lastname: 'raw', 
              age: '40', 
          }, 
          { 
              firstname: 'Kane', 
              lastname: 'James', 
              age: '40', 
          }, 
          { 
              firstname: 'Peter', 
              lastname: 'raw', 
              age: '40', 
          }, 
          { 
              firstname: 'Kane', 
              lastname: 'James', 
              age: '40', 
          }, 
          { 
              firstname: 'Peter', 
              lastname: 'raw', 
              age: '40', 
          }, 
          { 
              firstname: 'Kane', 
              lastname: 'James', 
              age: '40', 
          }, 
      ]; 
  } 
}

