import { Component } from '@angular/core';
import { InfeedReportComponent } from './infeed-report/infeed-report.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../../util/tokenIntercenpter';
import { AlarmHistoryReportComponent } from './alarm-history-report/alarm-history-report.component';


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [InfeedReportComponent,HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // Add other services here if needed
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

}
