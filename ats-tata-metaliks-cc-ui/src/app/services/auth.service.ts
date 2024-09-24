import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BASE_URL } from '../util/const';
import { MasterUserDetailsModel } from '../model/masterUserDetails.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isPasswordIsCorrect: boolean=false;
  private _isLoggedIn: boolean = false;
  UserLoogedIn: any;

  isAuthorized() {
    return true;
  }

  // hasRole(role: any) {
  //   if (role == this.currentUserValue.actorId) {
  //     return true;
  //   }
  //   return false;
  // }

  private currentUserSubject: BehaviorSubject<MasterUserDetailsModel>;
  public currentUser: Observable<MasterUserDetailsModel>;

  constructor(private http: HttpClient, private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<MasterUserDetailsModel>(JSON.parse(sessionStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): MasterUserDetailsModel {
    return this.currentUserSubject.value;
  }

  public get currentUserSub() {
    return this.currentUserSubject;
  }

  options!: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.post<MasterUserDetailsModel>(`${BASE_URL}login/authenticate?userName=${username}&userPassword=${password}`, { headers }).subscribe(
      (user: MasterUserDetailsModel) => {
        if (user != null) {
          console.log(user)
          console.log("Login sucessfully...!"+user);
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          console.log("this.currentUser %%%%%%%%%%", this.currentUser)
          this.currentUserSubject.next(user);
          this._isLoggedIn = true;
          //localStorage.setItem('token', JSON.stringify(user.jwtToken));
          sessionStorage.setItem('token', JSON.stringify(user.jwtToken));
          console.log("this._isLoggedIn", this._isLoggedIn)
          this.router.navigate(['dashboard/dashboard']);
          alert("Login sucessfully...!")
        } else {
          alert('Login Failed')
          //this.toastrService.danger('', 'Login Failed');
        }
        return user;
        // Your existing code...
      },
      error => {
        alert("error" + error);
      }
    );
  }

  // logout() {
  //   // remove user from local storage to log user out
  //   this.UserLoogedIn = this.currentUserValue;
  
  //   sessionStorage.clear();
  //   this.currentUserSubject.next(null!);
  //   this._isLoggedIn = false;
  //   sessionStorage.removeItem('token');
  //   console.log("*******************************8888888888888")

  //   this.router.navigate(['login']);

   
  // //  this.logoutSetOne(sessionStorage.currentUser);

  // console.log("*******************************8888888888888" + this.isLoggedIn)


 
  //   if(this.UserLoogedIn == null && this.UserLoogedIn == "") {

  //     console.log("+++++++++++this.UserLoogedIn  in ifffffff" + this.UserLoogedIn);
  //       this.logoutSetOne(this.UserLoogedIn);
  //       // this method i want to use to set value 0 in uselogged coloum 
  //   }

  // }


//   logout() {
//     this.UserLoogedIn = this.currentUserValue.userName; // Store the current user's username
//     console.log("******************************* :: " + JSON.stringify(this.UserLoogedIn)); // Log the username
//     console.log("******************************* :: " + sessionStorage.getItem('currentUser')); // Log the current user from session storage
//     sessionStorage.clear(); // Clear the session storage
//     this.currentUserSubject.next(null!); // Set the current user subject to null
//     this._isLoggedIn = false; // Set the isLoggedIn flag to false
//     console.log("*******************************8888888888888") // Log a separator for debugging
//     this.router.navigate(['login']); // Navigate to the login page
//     console.log("*******************************8888888888888" + sessionStorage.getItem('token')) // Log the token from session storage

//     if(this.UserLoogedIn != null || this.UserLoogedIn != "") { // If the UserLoogedIn is not null or empty
//       console.log("+++++++++++this.UserLoogedIn  in ifffffff" + this.UserLoogedIn); // Log the UserLoogedIn value
//         this.logoutSetOne(this.UserLoogedIn); // Call the logoutSetOne function with the UserLoogedIn value
//     }
// }

// public logoutSetOne(userName:String){
//   console.log("logoutSetOne :: " + userName); // Log the username
//   return this.http.post<MasterUserDetailsModel>(`${BASE_URL}login/logout/${userName}`, { observe: 'response' }); // Send a PUT request to the server to log out the user
// }

logout() {
  this.UserLoogedIn = this.currentUserValue.userName;
  console.log("******************************* :: " + JSON.stringify(this.UserLoogedIn));
  console.log("******************************* :: " + sessionStorage.getItem('currentUser'));
  sessionStorage.clear();
  sessionStorage.removeItem('token');
  this.currentUserSubject.next(null!);
  this._isLoggedIn = false;
  console.log("*******************************8888888888888");
  this.router.navigate(['login']);
  console.log("*******************************8888888888888" + sessionStorage.getItem('token'));

  if(this.UserLoogedIn != null && this.UserLoogedIn !== "") {
      console.log("+++++++++++this.UserLoogedIn  in ifffffff" + this.UserLoogedIn);
      this.logoutSetOne(this.UserLoogedIn);
  }
}

public logoutSetOne(userName: string) {
  console.log("logoutSetOne :: " + userName);
  return this.http.put(`${BASE_URL}login/logout/${userName}`, {}, { observe: 'response' })
      .subscribe(response => {
          console.log("User logged out successfully", response);
      }, error => {
          console.log("Error logging out user", error);
      });
}


  checkLoginUserPassword(username: string, password1: string) {
    return this.http.get<MasterUserDetailsModel>(`${BASE_URL}login/fetchCurrentUserLoginDetails?userName=${username}&userPassword=${password1}`);
  }

  logIn() {
    this._isLoggedIn = true;
  }

  // Call this method when the user logs out
  logOut() {
    this._isLoggedIn = false;
  }

  isLoggedIn(): boolean {
    //return this._isLoggedIn;
    console.log("this._isLoggedIn :: ", sessionStorage.getItem('token'))
    return sessionStorage.getItem('token') != null;
  }
}



