import { Component, OnInit, ViewChild } from '@angular/core';
import { AccessMatrixModel } from '../../../model/accessMatrix.model';
import { AccessMatrixService } from '../../../services/accessMatrix.service';
import { ImportsModule } from '../../../import';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-access-matrix',
  standalone: true,
  imports: [ImportsModule],
  providers: [MessageService],
  templateUrl: './access-matrix.component.html',
  styleUrls: ['./access-matrix.component.css']
})
export class AccessMatrixComponent implements OnInit {
  // accesmatrixDtOptions: DataTables.Settings = {}
  @ViewChild('dt') dt!: Table;
  accessMatrixList: AccessMatrixModel[] = [];
  updateAllMatrix: AccessMatrixModel = new AccessMatrixModel();
  isCheck: boolean = false;
  isChecked: boolean = false;
  numericValue: number = 0;
  admin!: boolean;



  constructor(private accessMatrixService: AccessMatrixService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getAllAccessMatrixDetails();
  }





  public getAllAccessMatrixDetails() {
    this.accessMatrixService.getAllAccessMatrixDetails().subscribe(manualList => {
      this.accessMatrixList = manualList;
      console.log("fetchAll...." + this.accessMatrixList)

    })
  }


  showHideStatus(event: any) {

    if (event.target.checked == true) {
      this.accessMatrixList[0].operator = 1
      this.isCheck = true;
      //this.addCheckBoxStatus(formlist)
      console.log(1)
    }
    else {
      this.isCheck = false;
      this.accessMatrixList[0].operator = 0
      // this.addCheckBoxStatus(formlist);
      console.log(0)
    }
  }





  updateNumericValue(access: AccessMatrixModel) {
    access.admin = access.admin ? 1 : 0; // Convert boolean to 1 if checked, 0 if unchecked
    access.operator = access.operator ? 1 : 0; // Convert boolean to 1 if checked, 0 if unchecked
    access.supervisor = access.supervisor ? 1 : 0; // Convert boolean to 1 if checked, 0 if unchecked

    this.accessMatrixService.updateAccessMatrix(access).subscribe(
      response => {
        
        console.log('Database updated successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Field Updated Succesfully.', life: 3000 });
      },
      error => {
        // Handle error
        console.error('Error updating database:', error);
      }
    );
  }




  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
  }
}













