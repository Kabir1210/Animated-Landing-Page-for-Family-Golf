
import { Component, ViewEncapsulation } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { MessageService } from 'primeng/api';
import { ImportsModule } from '../../../import';
import { InfeedMissionRuntimeDetailsService } from '../../../services/InfeedMissionRuntimeDetails.service';
import { DispatchOrderDeatilsService } from '../../../services/dispatchOrderDeatils.service';
import { DashboardDeatilsService } from '../../../services/dashboardDetails.service';
import { CurrentStockDetailsService } from '../../../services/currentStockDetails.service';
import { OutfeedMissionDetailsService } from '../../../services/outfeedMissionDetails.service';
import { InfeedMissionRuntimeDetailsModel } from '../../../model/InfeedMissionRuntimeDetails.model';
import { OutfeedMissionDetailsModel } from '../../../model/OutfeedMissionDetails.model';
import { CurrentStockDetailsModel } from '../../../model/currentStockDetails.model';
import { DispatchOrderDetailsModel } from '../../../model/dispatchOrderDetailsModel.model';
import { DashboardDetailsModel } from '../../../model/dashboardDetails.model';
import { EquipmentAlarmHistoryDetailsModel } from '../../../model/equipmentAlarmHistoryDetails.model';
import { EquipmentlAarmHistoryDetailsService } from '../../../services/equipmentAlarmHistoryDetails.service';
import { DividerModule } from 'primeng/divider';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ImportsModule, ChartModule, DividerModule],
  providers: [InfeedMissionRuntimeDetailsService, MessageService, DispatchOrderDeatilsService, DashboardDeatilsService,
    OutfeedMissionDetailsService, CurrentStockDetailsService, EquipmentlAarmHistoryDetailsService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  
})
export class DashboardComponent {
  basicData: any;

  basicOptions: any;
  dataLine: any;
  optionsLine: any;
  textColor: string = '#000';
  textColorSecondary: string = '#666';
  surfaceBorder: string = '#ddd';
  infeedData: any;
  outfeedData: any;
  infeedMissionDetails: InfeedMissionRuntimeDetailsModel[] = [];
  infeedCountSizeList: any[] = [];
  coreShooter6DetailsList: InfeedMissionRuntimeDetailsModel[] = [];
  coreShooter5DetailsList: InfeedMissionRuntimeDetailsModel[] = [];
  coreShooter4DetailsList: InfeedMissionRuntimeDetailsModel[] = [];
  outfeedMissionDetails: OutfeedMissionDetailsModel[] = [];
  outfeedCountSizeList: any[] = [];
  completedInfeedDetailsList: InfeedMissionRuntimeDetailsModel[] = [];
  completedOutfeedDetailsList: OutfeedMissionDetailsModel[] = [];
  rejectedOutfeedDetailsList: OutfeedMissionDetailsModel[] = [];
  cCM6DetailsList: OutfeedMissionDetailsModel[] = [];
  cCM7DetailsList: OutfeedMissionDetailsModel[] = [];
  cCM8DetailsList: OutfeedMissionDetailsModel[] = [];
  cCM9DetailsList: OutfeedMissionDetailsModel[] = [];
  cCM10DetailsList: OutfeedMissionDetailsModel[] = [];
  currentStockDetails: CurrentStockDetailsModel[] = [];
  currentCountSizeList: any[] = [];
  currentStockDetailsList: CurrentStockDetailsModel[] = [];
  manualTotalSizeList: any[] = [];
  dispatchOrderDetailsList: DispatchOrderDetailsModel[] = [];
  stacker1AlarmCount!: number;
  equipmentFirstAlarmHistoryDetailsTableList: EquipmentAlarmHistoryDetailsModel[] = [];
  dashboardDeatilsList: DashboardDetailsModel[] = [];
  dashboardDeatils: DashboardDetailsModel = new DashboardDetailsModel();
  timerID!: string;
  infeedCount: number = 0;
  outfeedCount: number = 0;
  qtytotal!: number;
  qtyActualQuantity!: number;
  qtyRemaning!: number;
  totalQuantity!: number;
  manualActualSizeList: any[] = [];
  manualRemaningSizeList: any[] = [];
  interval: any;
  ngOnInit() {

    this.fetchAllInfeedMissionByCurrentDate();
    this.fetchAllOutfeedMissionByCurrentDate();
    this.findAllCurrentStockDetails();
    this.fetchAllManualRetrivalOrderDetailsCurrentDate();
    this.fetchDataByResolveDateList();
    this.fetchAllByCurrentDate();
    this.getAllDayDashboardCount();

    this.fetch7DayInfeedamdoutfeedCount();


    this.interval = setInterval(() => {
      this.refreshChartData();
    }, 30000); // 5 seconds in milliseconds

  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  constructor(private infeedMissionRuntimeDetailsService: InfeedMissionRuntimeDetailsService,
    private outfeedMissionDetailsService: OutfeedMissionDetailsService,
    private currentStockDetailsService: CurrentStockDetailsService,
    private dispatchOrderDeatilsService: DispatchOrderDeatilsService,
    private equipmentAlarmHistoryDetailsService: EquipmentlAarmHistoryDetailsService,
    private dashboardDeatilsService: DashboardDeatilsService,

  ) { }



  initializeChartData() {

    console.log("in initializeChartData :: " + this.dashboardDeatilsList.length);


    this.infeedCount = this.dashboardDeatils.infeedCount;
    this.outfeedCount = this.dashboardDeatils.outfeedCount;

    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log(this.outfeedCount);
    console.log(this.infeedCount);
    // console.log(this.completedCount);

    this.basicData = {
      labels: ['Infeed Count', 'Outfeed Count'],

      datasets: [
        {
          label: 'Sales',
          data: [this.infeedCount, this.outfeedCount],
          backgroundColor: [' #1a75ff'],
          borderColor: ['#1a75ff'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: this.textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: this.textColorSecondary
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: this.textColorSecondary
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

  }


  initializeChartLine(infeedData: number[], outfeedData: number[]) {
    this.dataLine = {
      labels: this.dashboardDeatilsList.map(item => item.cdatetime),
      datasets: [
        {
          label: 'Infeed Count',
          data: infeedData,
          backgroundColor: '#1a75ff',
          borderColor: '#1a75ff',
          borderWidth: 1,
          fill: false,
          tension: 0.3
        },
        {
          label: 'Outfeed Count',
          data: outfeedData,
          backgroundColor: '#cc3399',
          borderColor: '#ff00ff',
          borderWidth: 1,
          fill: false,
          tension: 0.3
        }
      ]
    };

    this.optionsLine = {
      maintainAspectRatio: false,
      aspectRatio: 0.9,
      plugins: {
        legend: {
          labels: {
            color: this.textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: this.textColorSecondary
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: this.textColorSecondary
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  refreshChartData() {
    this.fetch7DayInfeedamdoutfeedCount();
    this.getAllDayDashboardCount();
  }

  public fetch7DayInfeedamdoutfeedCount() {
    this.dashboardDeatilsService.fetch7DayInfeedandoutfeedCount().subscribe(
      (data7days) => {
        this.dashboardDeatilsList = data7days;
        //console.log("dashboardDeatilsList" + JSON.stringify(this.dashboardDeatilsList));

        // Create arrays for infeed and outfeed counts
        let infeedCounts = this.dashboardDeatilsList.map(item => item.infeedCount);
        let outfeedCounts = this.dashboardDeatilsList.map(item => item.outfeedCount);

        //console.log("Infeed Counts: " + JSON.stringify(infeedCounts));
       // console.log("Outfeed Counts: " + JSON.stringify(outfeedCounts));
        this.initializeChartLine(infeedCounts, outfeedCounts);
      }
    );
  }






  public getAllDayDashboardCount() {
    this.dashboardDeatilsService.getAllDayDashboardCount().subscribe(
      data => {

        console.log("data +++++++++++++++++++++++  :: " + JSON.stringify(data))
        console.log("data size :: " + data)


        this.dashboardDeatils = data;
      //  console.log("dashboardDeatilsList   ********:: " + JSON.stringify(this.dashboardDeatils));

        this.infeedCount = this.dashboardDeatils.infeedCount;
        this.outfeedCount = this.dashboardDeatils.outfeedCount;

       // console.log("infeed :: " + this.infeedCount);
       // console.log("outfed :: " + this.outfeedCount);
        this.initializeChartData();
        // this.initializeChartLine();

      }

    );

  }



  //Infeeed count
  fetchAllInfeedMissionByCurrentDate() {
    this.infeedMissionRuntimeDetailsService.fetchAllInfeedMissionByCurrentDate().subscribe(data => {
      this.infeedMissionDetails = data;
      this.infeedCountSizeList = this.infeedMissionDetails.map(infeed => infeed.infeedMissionStatus);
      //console.log("Infeed count list:", this.infeedCountSizeList);
      // Filter the list by 'COMPLETED' status
      this.completedInfeedDetailsList = this.infeedMissionDetails.filter(infeed => infeed.infeedMissionStatus === "COMPLETED");
      //console.log("Completed Infeed count:", this.completedInfeedDetailsList.length);

      this.coreShooter6DetailsList = this.infeedMissionDetails.filter(coreshooter => coreshooter.coreShop === "CORE_SHOOTER-6");
      this.coreShooter5DetailsList = this.infeedMissionDetails.filter(coreshooter => coreshooter.coreShop === "CORE_SHOOTER-5");
      this.coreShooter4DetailsList = this.infeedMissionDetails.filter(coreshooter => coreshooter.coreShop === "CORE_SHOOTER-4");

    });


  }



  //OutFeed Count
  public fetchAllOutfeedMissionByCurrentDate() {
    this.outfeedMissionDetailsService.fetchAllOutfeedMissionByCurrentDate().subscribe(data => {
      this.outfeedMissionDetails = data;

      this.outfeedCountSizeList = this.outfeedMissionDetails.map(outfeed => outfeed.outfeedMissionStatus);
     // console.log("outfeed count list:", this.infeedCountSizeList);

      // Filter the list by 'COMPLETED' status
      this.completedOutfeedDetailsList = this.outfeedMissionDetails.filter(outfeed => outfeed.outfeedMissionStatus === "COMPLETED");
     // console.log("Completed outfeed count:", this.completedInfeedDetailsList.length);
      this.rejectedOutfeedDetailsList = this.outfeedMissionDetails.filter(outfeed => outfeed.outfeedMissionStatus === "REWORK");
      //console.log("rejectedOutfeedDetailsList count:", this.rejectedOutfeedDetailsList.length);

      this.cCM6DetailsList = this.outfeedMissionDetails.filter(ccmlist => ccmlist.destination === "CCM-6");
      this.cCM7DetailsList = this.outfeedMissionDetails.filter(ccmlist => ccmlist.destination === "CCM-7");
      this.cCM8DetailsList = this.outfeedMissionDetails.filter(ccmlist => ccmlist.destination === "CCM-8");
      this.cCM9DetailsList = this.outfeedMissionDetails.filter(ccmlist => ccmlist.destination === "CCM-9");
      this.cCM10DetailsList = this.outfeedMissionDetails.filter(ccmlist => ccmlist.destination === "CCM-10");
    });


  }

  //current stock
  public findAllCurrentStockDetails() {
    this.currentStockDetailsService.findAllCurrentStockDetails().subscribe(data => {
      this.currentStockDetails = data;

      //  this.currentCountSizeList = this.currentStockDetails.map(outfeed => outfeed.palletCode);
      this.currentCountSizeList = this.currentStockDetails
        .filter(outfeed => outfeed.palletCode !== 'NA')  // Filter out items where palletCode is 'NA'
        .map(outfeed => outfeed.palletCode);  // Map the remaining items to their palletCode

     // console.log("currentCountSizeList list:", this.currentCountSizeList);

      // Filter the list by 'COMPLETED' status
      // this.currentStockDetailsList = this.currentStockDetails.filter(outfeed => outfeed.outfeedMissionStatus === "COMPLETED");
      // console.log("Completed outfeed count:", this.completedInfeedDetailsList.length);
    });
  }
  //Alarm count 
  public fetchDataByResolveDateList() {
    this.equipmentAlarmHistoryDetailsService.findResolveDateEmptyList().subscribe(equipmentIdList => {
      this.equipmentFirstAlarmHistoryDetailsTableList = equipmentIdList;
      this.stacker1AlarmCount = this.equipmentFirstAlarmHistoryDetailsTableList.length;
    })
  }

  public fetchAllByCurrentDate() {
    this.equipmentAlarmHistoryDetailsService.fetchAllByCurrentDate().subscribe(equipmentCurrentList => {
      this.equipmentFirstAlarmHistoryDetailsTableList = equipmentCurrentList;
    })
  }

  calculatePercentage(value: number, total: number): number {
    if (total === 0) {
      return 0;
    }
    return Math.round((value / total) * 100);
  }
  ///ASRS order Details 
  public fetchAllManualRetrivalOrderDetailsCurrentDate() {
    this.dispatchOrderDeatilsService.fetchAllManualRetrivalOrderDetailsByCurrentDate().subscribe(data => {
      this.dispatchOrderDetailsList = data;
      this.qtytotal = 0;
      this.manualTotalSizeList = this.dispatchOrderDetailsList.map(dispatch => dispatch.totalQuantity);
    //  console.log("manualTotalSizeList of total", this.manualTotalSizeList);
      for (let i = 0; i < this.manualTotalSizeList.length; i++) {
        let quantity = this.manualTotalSizeList[i];
        this.qtytotal += quantity;
        console.log("qtytotal:", this.qtytotal);
      }

      this.qtyActualQuantity = 0;
      this.manualActualSizeList = this.dispatchOrderDetailsList.map(dispatch => dispatch.actualQuantity);
      //console.log("manualPlannedSizeList of planned", this.manualActualSizeList);
      this.qtyActualQuantity = 0;

      for (let i = 0; i < this.manualActualSizeList.length; i++) {
        let quantity = this.manualActualSizeList[i];
        this.qtyActualQuantity += quantity;

      }
    //  console.log("qtyActualQuantity:", this.qtyActualQuantity);

      this.manualRemaningSizeList = this.dispatchOrderDetailsList.map(dispatch => dispatch.remaningQuantity);

      this.qtyRemaning = 0;

      // Iterating through manualRemaningSizeList to sum up quantities
      for (let i = 0; i < this.manualRemaningSizeList.length; i++) {
        let quantity = this.manualRemaningSizeList[i];
        this.qtyRemaning += quantity;
      }

     // console.log("qtyRemaning:", this.qtyRemaning);
      //  this.totalQuantity=this.qtytotal+this.qtyPlanned+this.qtyRemaning;
    });
  }


}







