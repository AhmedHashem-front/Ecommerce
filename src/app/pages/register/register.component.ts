import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isLoading: boolean = false;
  msgError: string = '';
  isSuccess: string = '';
  private readonly authService = inject(AuthService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  private readonly router = inject(Router);
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPassword
  );
  submitForm(): void {
    this.ngxSpinnerService.show()
    if (this.registerForm.valid) {
      this.isLoading = true;

      //send data
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.isSuccess = res.message;
            setInterval(() => {
              this.router.navigate(['/login']);
            }, 500);
          }
          this.isLoading = false;
          this.ngxSpinnerService.hide()
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
          this.msgError = error.error.message;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : { misMatch: true };
  }
}
