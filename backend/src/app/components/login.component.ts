// frontend/src/app/components/login.component.ts
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(private userService: UserService) {}

    login(email: string, password: string) {
        this.userService.login({ email, password }).subscribe(response => {
            console.log('User logged in', response);
        }, error => {
            console.error('Login failed', error);
        });
    }
}
