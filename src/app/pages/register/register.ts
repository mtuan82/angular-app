import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormsModule, AbstractControl, ValidationErrors,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, FormsModule, CommonModule, MatInputModule, MatButtonModule,ReactiveFormsModule ],
    templateUrl: 'register.html',
    styleUrl: './register.scss'
})
export class RegisterComponent {

    registerForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        username: new FormControl(null, [Validators.required]),
        firstname: new FormControl(null, [Validators.required]),
        lastname: new FormControl(null, [Validators.required]),
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

    }
}