import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule,  } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { TableModule } from "primeng/table";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./util/tokenIntercenpter";
import { Table } from 'primeng/table';








NgModule({
    declarations: [
      AppComponent,
      
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule ,
      CommonModule,
      DataTablesModule,
      TableModule,
      HttpClientModule,
      NgModule,
      Table

   
      
    ],
    providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }