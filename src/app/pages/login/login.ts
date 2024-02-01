import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authService';
import { filter, Subject, take, takeUntil } from 'rxjs';
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
export class LoginComponent implements OnInit {
    public username: string = "";
    public password: string = "";
    public loginValid: boolean = true;

    private _destroySub$ = new Subject<void>();
    private readonly returnUrl: string;

    constructor(private _router: Router, private _route: ActivatedRoute, private auth: AuthService) {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || 'login'
    }

    public ngOnInit(): void { 
        this.auth.isAuthenticated.pipe(
            filter((isAuthenticated: boolean) => isAuthenticated),
            takeUntil(this._destroySub$)
        ).subscribe(_ => this._router.navigateByUrl(this.returnUrl));
    }

    onSubmit() {
        this.auth.login(this.username, this.password).pipe(   
        ).subscribe({
            next: () => {
                console.log("daskboard")
                localStorage.setItem(this.auth.LOCALSTORAGE_IS_LOGIN, 'true');
                this.loginValid = true;
                this._router.navigateByUrl('/feature');
            },
            error: () => {
                console.log("error")
                localStorage.setItem(this.auth.LOCALSTORAGE_IS_LOGIN, 'false');
                this.loginValid = false
            },
            complete: () => console.log("complete")
        });
    }
}