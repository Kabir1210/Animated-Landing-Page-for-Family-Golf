import { Component } from '@angular/core';
import { ImportsModule } from '../../import';
import { InfeedMissionRuntimeDetailsService } from '../../services/InfeedMissionRuntimeDetails.service';
import { OutfeedMissionDetailsService } from '../../services/outfeedMissionDetails.service';
import { InfeedMissionRuntimeDetailsModel } from '../../model/InfeedMissionRuntimeDetails.model';
import { OutfeedMissionDetailsModel } from '../../model/OutfeedMissionDetails.model';



@Component({
  selector: 'app-andon-screen',
  standalone: true,
  imports: [ImportsModule],

  templateUrl: './andon-screen.component.html',
  styleUrl: './andon-screen.component.css'
})
export class AndonScreenComponent {
  //for outfeed//
  outfeedMissionTableList: OutfeedMissionDetailsModel[] = [];
  outfeedCountSizeList: any[] = [];
  completedOutfeedDetailsList: OutfeedMissionDetailsModel[] = [];
  cCM6DetailsList: OutfeedMissionDetailsModel[] = [];
  cCM7DetailsList: OutfeedMissionDetailsModel[] = [];
  cCM8DetailsList: OutfeedMissionDetailsModel[] = [];
  cCM9DetailsList: OutfeedMissionDetailsModel[] = [];
  cCM10DetailsList: OutfeedMissionDetailsModel[] = [];

  // for infeed//
  infeedMissionTableList: InfeedMissionRuntimeDetailsModel[] = [];
  infeedCountSizeList: any[] = [];
  completedInfeedDetailsList: InfeedMissionRuntimeDetailsModel[] = [];
  coreShooter6DetailsList: InfeedMissionRuntimeDetailsModel[] = [];
  coreShooter5DetailsList: InfeedMissionRuntimeDetailsModel[] = [];
  coreShooter4DetailsList: InfeedMissionRuntimeDetailsModel[] = [];

  ngOnInit() {
    this.fetchAllOutfeedMissionByCurrentDate();
    this.fetchAllInfeedMissionByCurrentDate();
  }
  constructor(private infeedMissionRuntimeDetailsService: InfeedMissionRuntimeDetailsService,
    private outfeedMissionDetailsService: OutfeedMissionDetailsService,){

  }



  public fetchAllOutfeedMissionByCurrentDate() {
    this.outfeedMissionDetailsService.fetchAllOutfeedMissionByCurrentDate().subscribe(data => {
      this.outfeedMissionTableList = data;
      console.log("outfeedList::"+ data)
 console.log("outfeedList::"+  this.outfeedMissionTableList)
      this.outfeedCountSizeList = this.outfeedMissionTableList.map(outfeed => outfeed.outfeedMissionStatus);
      console.log("outfeed count list:", this.outfeedCountSizeList);

      // Filter the list by 'COMPLETED' status
      this.completedOutfeedDetailsList = this.outfeedMissionTableList.filter(outfeed => outfeed.outfeedMissionStatus === "COMPLETED");
      console.log("Completed outfeed count:", this.completedOutfeedDetailsList.length);
      

      this.cCM6DetailsList = this.outfeedMissionTableList.filter(ccmlist => ccmlist.destination === "CCM-6");
      this.cCM7DetailsList = this.outfeedMissionTableList.filter(ccmlist => ccmlist.destination === "CCM-7");
      this.cCM8DetailsList = this.outfeedMissionTableList.filter(ccmlist => ccmlist.destination === "CCM-8");
      this.cCM9DetailsList = this.outfeedMissionTableList.filter(ccmlist => ccmlist.destination === "CCM-9");
      this.cCM10DetailsList = this.outfeedMissionTableList.filter(ccmlist => ccmlist.destination === "CCM-10");
    });


  }

  fetchAllInfeedMissionByCurrentDate() {
    this.infeedMissionRuntimeDetailsService.fetchAllInfeedMissionByCurrentDate().subscribe(data => {
      this.infeedMissionTableList = data;
      this.infeedCountSizeList = this.infeedMissionTableList.map(infeed => infeed.infeedMissionStatus);
      console.log("Infeed count list:", this.infeedCountSizeList);
      // Filter the list by 'COMPLETED' status
      this.completedInfeedDetailsList = this.infeedMissionTableList.filter(infeed => infeed.infeedMissionStatus === "COMPLETED");
      console.log("Completed Infeed count:", this.completedInfeedDetailsList.length);

      this.coreShooter6DetailsList = this.infeedMissionTableList.filter(coreshooter => coreshooter.coreShop === "CORE_SHOOTER-6");
      this.coreShooter5DetailsList = this.infeedMissionTableList.filter(coreshooter => coreshooter.coreShop === "CORE_SHOOTER-5");
      this.coreShooter4DetailsList = this.infeedMissionTableList.filter(coreshooter => coreshooter.coreShop === "CORE_SHOOTER-4");

    });


  }
}
