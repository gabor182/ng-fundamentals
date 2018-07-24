import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em { float: right; color: #e05c65; padding-left: 10px; }
    `]
})
export class LoginComponent {

    userName: string;
    password: string;
    mouseoverLogin: boolean;

    constructor(private authService: AuthService, private router: Router) { }

    login(values) {
        this.authService.loginUser(values.userName, values.password);
        this.router.navigate(['events']);
    }

    cancel() {
        this.router.navigate(['events']);
    }
}
