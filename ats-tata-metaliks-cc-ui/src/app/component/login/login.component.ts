import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImportsModule } from '../../import';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor, ImportsModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthenticationService) { }
  userName!:string 
  password!:string
  showPassword: boolean = false;
  capsLockOn: boolean = false;


  ngOnInit(): void 
  {
  }
login()
{  
  console.log(this.userName)
  console.log(this.password)
 this.auth.login(this.userName,this.password);
}
togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

checkCapsLock(event: KeyboardEvent): void {
  this.capsLockOn = event.getModifierState('CapsLock');
}

}
