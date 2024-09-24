import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Route, Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from "../../services/auth.service";
import { AccessMatrixService } from "../../services/accessMatrix.service";
import { Role } from "../../util/role.enum";
import { AccessMatrixModel } from "../../model/accessMatrix.model";


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private accessMatrixService: AccessMatrixService
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const requiredRoles: Role[] = route.data['roles'] || [];
        const accessField: string = route.data['accessField']?.toLowerCase() || '';

        console.log('canActivate: accessField:', accessField, 'requiredRoles:', requiredRoles);
        return this.checkAccess(requiredRoles, accessField);
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        const requiredRoles: Role[] = route.data && route.data['roles'] || [];
        const accessField: string = route.data && route.data['accessField']?.toLowerCase() || '';

        console.log('canLoad: accessField:', accessField, 'requiredRoles:', requiredRoles);
        return this.checkAccess(requiredRoles, accessField);
    }

    private checkAccess(requiredRoles: Role[], accessField: string): Observable<boolean> {
        if (!this.authService.isAuthorized()) {
            console.log("1111111111")
            this.router.navigate(['/login']);
            return of(false);
        }

        const currentUrl = this.router.url;

        return this.accessMatrixService.getAllAccessMatrixDetails().pipe(
            map((accessMatrix: AccessMatrixModel[]) => {
                const currentUser = this.authService.currentUserValue;

                if (!currentUser || !accessField) {
                    console.log("*******")
                    this.router.navigate(['/login']);
                    return false;
                }

                console.log('checkAccess1: currentUser:', currentUser, 'accessField:', accessField);
                console.log('checkAccess2: accessMatrix:', accessMatrix);
                console.log('checkAccess3: currentUrl:', currentUrl); // Log current loaded page
                // Get the attribute names of the first object in the array
                const attributeNames = Object.keys(accessMatrix[0]);
                const routeAccess = accessMatrix.find(am => am.field.toLowerCase() === accessField.toLowerCase());
                if (attributeNames[2] == "admin" && this.authService.currentUserValue.roleName === Role.Admin) {
                    if (!routeAccess?.admin) {
                        this.router.navigate(['/acces-denied']);
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else if (attributeNames[3] == "operator" && this.authService.currentUserValue.roleName === Role.Operator) {
                    if (!routeAccess?.operator) {

                        this.router.navigate(['/acces-denied']);
                        return false;
                    }
                    else {

                        return true;
                    }
                }
                else if (attributeNames[4] == "supervisor" && this.authService.currentUserValue.roleName === Role.Superwise) {

                    if (!routeAccess?.supervisor) {

                        this.router.navigate(['/acces-denied']);
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {

                    this.router.navigate(['/acces-denied']);
                    return false;
                }
            }),
            catchError((error) => {
                console.error('Error fetching access matrix', error);
                alert("Error for fetch data");
                // this.router.navigate(['/login']);
                return of(false);
            })
        );
    }

}
