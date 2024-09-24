import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NewTableComComponent } from './new-table-com/new-table-com.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [TableModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

}
