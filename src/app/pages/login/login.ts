import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, FormsModule, CommonModule, MatInputModule, MatButtonModule],
    templateUrl: 'login.html',
    styleUrl: './login.scss'
})
export class LoginComponent {
    public username: string = "nmtuan@gmail.com1";
    public password: string = "Navarre@2245";
    public invalidMsg: string = "";

    constructor(private _router: Router, private auth: AuthService) {
        
    }

    onSubmit() {
        this.auth.login(this.username, this.password).subscribe({
            next: (token:any) => {
                localStorage.setItem(this.auth.LOCALSTORAGE_IS_LOGIN, 'true');
                this._router.navigateByUrl('feature');
                console.log("daskboard: " + token)
            },
            error: (msg:any) => {
                console.log(msg.error)
                localStorage.setItem(this.auth.LOCALSTORAGE_IS_LOGIN, 'false');
                this.invalidMsg = msg.error;
            },
            complete: () => console.log("complete")
        });
    }
}