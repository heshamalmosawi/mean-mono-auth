import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthState } from "../store/auth.reducer";
import { Router } from "@angular/router";
import { loginStart, registerStart } from "../store/auth.actions";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    imports: [
        CommonModule, 
        ReactiveFormsModule,
    ],
})
export class AuthComponent implements OnInit {
    authForm!: FormGroup;
    isLoginMode = true;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    user$: Observable<any>;

    constructor(
        private fb: FormBuilder,
        private store: Store<{ auth: AuthState }>,
        private router: Router
    ) {
        this.loading$ = this.store.select(state => state.auth.loading);
        this.error$ = this.store.select(state => state.auth.error);
        this.user$ = this.store.select(state => state.auth.user);
    }

    // turning it to a standalone function so i can reuse it
    initForm = () => {
        if (this.isLoginMode) {
            this.authForm = this.fb.group({
              username: ['', Validators.required],
              password: ['', Validators.required]
            });
          } else {
            this.authForm = this.fb.group({
              username: ['', Validators.required],
              email: ['', [Validators.required, Validators.email]],
              password: ['', Validators.required]
            });
          }
    }

    ngOnInit(): void {
        this.initForm();

        // this.user$.subscribe(user => {
        //     if (user) {
        //         this.onSuccess();
        //         this.router.navigate(['/dashboard']);
        //     }
        // });
    }

    onSubmit() {
        console.log("wtf", this.isLoginMode);
        if (!this.authForm.valid) {
            return;
        }

        const { username, email, password } = this.authForm.value;

        if (this.isLoginMode) {
            this.store.dispatch(loginStart({ username, password }));
            // fetch("localhost:3000/")
        } else {
            this.store.dispatch(registerStart({ username, email, password }));
        }
    }

    onSuccess() {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 8);
        document.cookie = `loggedIn=true; expires=${expirationDate.toUTCString()}; path=/`;
    }

    toggleAuthMode() {
        this.isLoginMode = !this.isLoginMode;
        this.initForm();
    }
}

