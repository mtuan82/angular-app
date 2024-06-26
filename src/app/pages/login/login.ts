import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

@Component({
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, FormsModule, CommonModule, MatInputModule, MatButtonModule],
    templateUrl: 'login.html',
    styleUrl: './login.scss'
})
export class LoginComponent {
    public username: string = "mtuanbo@gmail.com";
    public password: string = "Fulva@123";
    public invalidMsg = new BehaviorSubject<string>("");

    constructor(private _router: Router, private auth: AuthService) {     
    }

    onSubmit() {
        this.auth.login(this.username, this.password).subscribe({
            next: (token:any) => {
                localStorage.setItem(this.auth.LOCALSTORAGE_IS_LOGIN, 'true');
                localStorage.setItem(this.auth.LOCALSTORAGE_TOKEN, token);
                this._router.navigateByUrl('feature');
                console.log("daskboard: " + token)
            },
            error: (msg:any) => {
                console.log(msg.error)
                localStorage.setItem(this.auth.LOCALSTORAGE_IS_LOGIN, 'false');
                this.invalidMsg.next(msg.error);
            },
            complete: () => console.log("complete")
        });
    }
}