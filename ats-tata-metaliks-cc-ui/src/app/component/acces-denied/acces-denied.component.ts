import { Component, OnInit } from '@angular/core';
import { MasterUserDetailsModel } from '../../model/masterUserDetails.model';
import { AuthenticationService } from '../../services/auth.service';
import { Role } from '../../util/role.enum';


@Component({
  selector: 'app-acces-denied',
  standalone: true,
  imports: [],
  templateUrl: './acces-denied.component.html',
  styleUrl: './acces-denied.component.css'
})
export class AccesDeniedComponent implements OnInit{
  currentUser: MasterUserDetailsModel | undefined;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
   
    this.currentUser = this.authService.currentUserValue;
    console.log("role Name ::"+this.authService.currentUserValue.roleName);
  }


  isOperator(): boolean {
    const currentUser = this.authService.currentUserValue;
    return currentUser && currentUser.roleName === Role.Operator;
  }

  isSuperwiser(){
    const currentUser=this.authService.currentUserValue;
    return currentUser && currentUser.roleName === Role.Superwise;
  }

  otherRoleORAdmin(){
    const currentUser=this.authService.currentUserValue;
    return currentUser && currentUser.roleName === Role.Admin;
  }
}
