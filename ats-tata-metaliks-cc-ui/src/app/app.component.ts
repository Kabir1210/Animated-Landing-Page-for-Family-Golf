import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';  // Correctly import MenubarModule
import { MenuItem } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './util/tokenIntercenpter';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { DropdownModule } from 'primeng/dropdown';
import { AuthenticationService } from './services/auth.service';
import { ImportsModule } from './import';



@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MenubarModule, HttpClientModule, BadgeModule, BreadcrumbModule, AvatarModule, DropdownModule, ToolbarModule, 
        InputIconModule, IconFieldModule, CommonModule, TabMenuModule, ImportsModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        // Add other services here if needed
    ],

    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ats-tata-metaliks-cc-ui';
    items: MenuItem[] | undefined;

    isLoggedIn: boolean = false;
    currentUser: any;
    currentUserImage: any;
    isDropdownVisible: boolean = false;
    

    constructor(private router: Router,
        private authService: AuthenticationService,
        private route:Router 
    ) { }


  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;

    
  }

  navigateTo(route: string) {
    this.isDropdownVisible = false;
    if (route === 'my-profile') {
      this.router.navigate(['/my-profile']);
    }
  }

    logout(){
        this.isDropdownVisible = false;
       
        this.authService.logout();
        this.route.navigate(['login'])
      
      }

  
    ngOnInit(): void {
        
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                command: () => {
                    this.router.navigate(['dashboard/dashboard']);
                    
                }
            },
            // {
            //     label: 'app-andon-screen',
            //     routerLink: 'app-andon-screen',
            //     icon: 'pi pi-tablet',

            // },
            {
                label: 'Master',
                icon: 'pi pi-user',
                items: [
                    {
                        label: 'Master User',
                        icon: 'pi pi-user',
                        routerLink: 'master/master-user-details',
                        //route: '/master/user'
                    },
                    {
                        label: 'Master Core',
                        icon: 'pi pi-box',
                        routerLink: 'master/master-product-details',
                        //route: '/master/product'
                    },
                    {
                        label: 'Master Shift Details',
                        icon: 'pi pi-users',
                        routerLink: 'master/master-shift-details',
                        // route: 'master/master-shift-details'
                    },
                ]
            },

            {
                label: 'Control',
                icon: 'pi pi-spin pi-cog',
                items: [
                    {
                        label: 'Manage Location',
                        icon: 'pi pi-map',
                        routerLink: 'control/manage-location'
                    },
                    {
                        label: 'CurrentStock Details',
                        icon: 'pi pi-warehouse',
                        routerLink: 'control/current-stock-details'
                    },
                    {
                        label: 'Generate manule Retrievel Order',
                        icon: 'pi pi-box',
                        routerLink: 'control/generate-manule-retrievel-order'

                    },
                    {
                        label: '2D Layout',
                        icon: 'pi pi-objects-column',
                        routerLink: 'control/layout'
                    },
                    {
                        label: 'Transfer Pallet',
                        icon: 'pi pi-truck',
                        routerLink: 'control/internal-pallet-movement'
                    },
                    {
                        label: 'Acess Matrix',
                        icon: 'pi pi-key',
                        routerLink: 'control/access-matrix'
                    }
                    
                ]
            },

            {
                label: 'Monitor',
                icon: 'pi pi-desktop',
                // command: () => {
                //     this.router.navigate(['/monitor']);
                // }



                items: [
                    {
                        label: 'stacker live faults',
                        icon: 'pi pi-bell',
                        routerLink: 'monitor/stacker-live-faults'
                    },
                    {
                        label: 'Dms layout',
                        icon: 'pi pi-th-large',
                        routerLink: 'monitor/dms-layout'

                    },

                    {
                        label: 'Equipment status',
                        icon: 'pi pi-chart-bar',
                        routerLink: 'monitor/equipment-status'

                    },
                    {
                        label: 'Current Mission',
                        icon: 'pi pi-hourglass',
                        routerLink: 'monitor/current-mission'

                    },
                    {
                        label: 'CCM Buffer',
                        icon: 'pi pi-spinner-dotted',
                        routerLink: 'monitor/ccm-buffer-details'

                    }
                 
                ]
            },

            {
                label: 'Reports',
                icon: 'pi pi-server',
                items: [
                    {
                        label: 'Infeed Report',
                        icon: 'pi pi-arrow-down',
                        routerLink: 'report/infeed-report'
                    },
                    {
                        label: 'Outfeed Report',
                        icon: 'pi pi-arrow-up',
                        routerLink: 'report/outfeed-report-details'
                    },
                    {
                        label: 'Equipment Alarm History Report',
                        icon: 'pi pi-bell',
                        routerLink: 'report/equipment-alarm-history-report'
                    },
                    {
                        label:'Audit Trail Report',
                        icon: 'pi pi-address-book',
                        routerLink: 'report/app-audit-trail-report'
                    }
                ],
                // command: () => {
                //     this.router.navigate(['/master/New']);
                // }
            },
            // { label: 'Contact Us', icon: 'pi pi-phone', url: 'https://www.ats-group.com/' }
        ];

        //this.checkLogin();
   

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.checkLogin();
            }
            
        });    

        
      

    }
    checkLogin() {
        
            console.log("login ::" + this.authService.isLoggedIn());
            console.log("login appcomponent :: " + this.isLoggedIn);
            if (this.authService.isLoggedIn()) {
                this.isLoggedIn = true;
                console.log("login 12" + this.isLoggedIn);

                this.currentUser = this.authService.currentUserValue;
                this.currentUserImage = this.currentUser.image;
             
            }
            else {
                console.log("login not  ###########");
                this.router.navigate(['login']);
            }; 
    }


    

}

