
import { LoginComponent } from './component/login/login.component';
import { MonitorComponent } from './component/monitor/monitor.component';
import { EquipmentStatusComponent } from './component/monitor/equipment-status/equipment-status.component';
import { Routes } from '@angular/router';
import { ControlComponent } from './component/control/control.component';
import { CurrentStockDetailsComponent } from './component/control/current-stock-details/current-stock-details.component';
import { LayoutVisualizationComponent } from './component/control/layout-visualization/layout-visualization.component';
import { MasterComponent } from './component/master/master.component';
import { MasterShiftDetailsComponent } from './component/master/master-shift-details/master-shift-details.component';
import { InfeedReportComponent } from './component/report/infeed-report/infeed-report.component';
import { AppComponent } from './app.component';
import { MasterProductDetailsComponent } from './component/master/master-product-details/master-product-details.component';
import { GenerateManuleRetrievelOrderComponent } from './component/control/generate-manule-retrievel-order/generate-manule-retrievel-order.component';
import { MasterUserDetailsComponent } from './component/master/master-user-details/master-user-details.component';
import { StackerLiveFaultsComponent } from './component/monitor/stacker-live-faults/stacker-live-faults.component';
import { DMSLayoutComponent } from './component/monitor/dms-layout/dms-layout.component';
import { OutfeedReportDetailsComponent } from './component/report/outfeed-report-details/outfeed-report-details.component';
import { AccessMatrixComponent } from './component/control/access-matrix/access-matrix.component';
import { AuthGuard } from './component/auth/auth.guard';
import { Role } from './util/role.enum';
import { AccesDeniedComponent } from './component/acces-denied/acces-denied.component';
import { AlarmHistoryReportComponent } from './component/report/alarm-history-report/alarm-history-report.component';
import { AuditTrailReportComponent } from './component/report/audit-trail-report/audit-trail-report.component';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { CurrentMissionComponent } from './component/monitor/current-mission/current-mission.component';
import { ManageLocationComponent } from './component/control/manage-location/manage-location.component';
import { TransferPalletComponent } from './component/control/transfer-pallet/transfer-pallet.component';
import { InternalPalletMovementComponent } from './component/control/internal-pallet-movement/internal-pallet-movement.component';
import { CcmBufferDetailsComponent } from './component/monitor/ccm-buffer-details/ccm-buffer-details.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { AndonScreenComponent } from './component/andon-screen/andon-screen.component';



export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
      },
      {
        path:'app-andon-screen',
        component: AndonScreenComponent,
      },
      {
        path: 'control/layout',
        component: LayoutVisualizationComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: '2D Layout' 
        },
      },
      {
        path: 'acces-denied',
        component: AccesDeniedComponent
      },
     
      {
        path:'monitor',
        component:MonitorComponent
      },
      {
        path:'control',
        component:ControlComponent,
        
      },

      {
        path:'control/current-stock-details',
        component:CurrentStockDetailsComponent,
       canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'CurrentStock Details' 
        },
      },
      {
        path:'control/generate-manule-retrievel-order',
        component:GenerateManuleRetrievelOrderComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Generate manule Retrievel Order' 
        },
      },
 {
        path:'control/access-matrix',
        component:AccessMatrixComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Access Matrix' 
        },
      },
      {
        path:'monitor/stacker-live-faults',
        component:StackerLiveFaultsComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'stacker live faults' 
        },
      },

      
      {
        path:'monitor/dms-layout',
        component:DMSLayoutComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Dms layout' 
        },
      },

      {
        path:'monitor/equipment-status',
        component:EquipmentStatusComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Equipment status' 
        },

      },
      {
        path:'master',
        component:MasterComponent
      },
      {
        path:'master/master-user-details',
        component:MasterUserDetailsComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Master User' 
        },
      },
      {
        path:'master/master-shift-details',
        component:MasterShiftDetailsComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Master Shift Details' 
        },
      },
      {
        path:'master/master-product-details',
        component:MasterProductDetailsComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Master Product' 
        },
      },
     
      
      {
        path:'report/infeed-report',
        component:InfeedReportComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Infeed Report' 
        },
      },
    
      {
        path:'report/outfeed-report-details',
        component:OutfeedReportDetailsComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Outfeed Report' 
        },
      },
      {
        path:'report/equipment-alarm-history-report',
        component:AlarmHistoryReportComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
    accessField:'Alarm Report'
        },
      },
      {
        path:'control/manage-location',
        component:ManageLocationComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField:'Manage Location'
       
        },
      },
      {
        path:'control/internal-pallet-movement',
        component:InternalPalletMovementComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField:'Transfer Pallet'
       
        },
      },
      {
        path:'monitor/current-mission',
        component:CurrentMissionComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField:'Current Mission'

        },
      },
      {
        path:'dashboard/dashboard',
        component:DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'Dashboard'
    
        },
      },
      {
        path:'monitor/ccm-buffer-details',
        component:CcmBufferDetailsComponent,
        canActivate: [AuthGuard],
        data: {
            roles: [Role.Admin, Role.Superwise, Role.Operator],
            accessField: 'CCM Buffer'
    
        },
      },
       
      {
        path:'report/app-audit-trail-report',
        component:AuditTrailReportComponent
      },

      {
      path:'my-profile',
      component:MyProfileComponent
      },
     
      
      { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
 
];

