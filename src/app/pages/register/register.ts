import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormsModule, AbstractControl, ValidationErrors,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { AuthService } from '../../services/authService';
import { BehaviorSubject } from 'rxjs';

@Component({
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, FormsModule, CommonModule, 
        MatInputModule, MatButtonModule,ReactiveFormsModule,MatSelectModule ],
    templateUrl: 'register.html',
    styleUrl: './register.scss'
})
export class RegisterComponent {
    public message = new BehaviorSubject<string>("");
    public colorMsg = new BehaviorSubject<string>("");

    constructor(private auth: AuthService){
    }

    registerForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        username: new FormControl(null, [Validators.required]),
        firstname: new FormControl(null, [Validators.required]),
        lastname: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required]),
        role: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        passwordConfirm: new FormControl(null, [Validators.required])
    },
        // add custom Validators to the form, to make sure that password and passwordConfirm are equal
        { validators: this.passwordsMatching }
    )

    passwordsMatching(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const passwordConfirm = control.get('passwordConfirm')?.value;

        // Check if passwords are matching. If not then add the error 'passwordsNotMatching: true' to the form
        if ((password === passwordConfirm) && (password !== null && passwordConfirm !== null)) {
            return null;
        } else {
            return { passwordsNotMatching: true };
        }
    }

    register() {
        this.auth.register({
            "twoFactorEnabled": false,
            "firstname": this.registerForm.get('firstname')?.value ?? "",
            "lastname": this.registerForm.get('lastname')?.value ?? "",
            "role": this.registerForm.get('role')?.value ?? "",
            "phoneNumber": this.registerForm.get('phone')?.value ?? "",
            "username": this.registerForm.get('username')?.value ?? "",
            "email": this.registerForm.get('email')?.value ?? "",
            "password": this.registerForm.get('password')?.value ?? ""
        }).subscribe({
            next: () => {
                this.message.next("Register Successful");
                this.colorMsg.next("Green");
            },
            error: (msg:any) => {
                this.message.next(msg.error);
                this.colorMsg.next("Red");
            },
            complete: () => console.log("complete")
        });
    }
}