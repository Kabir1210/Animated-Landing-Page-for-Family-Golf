import { Component } from '@angular/core';
import { MasterUserDetailsModel } from '../../model/masterUserDetails.model';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  currentUser: MasterUserDetailsModel | undefined;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
   
    this.currentUser = this.authService.currentUserValue;
  }

}
