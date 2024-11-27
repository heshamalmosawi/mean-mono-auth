import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthState } from "../store/auth.reducer";
import { Router } from "@angular/router";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "../store/auth.actions";
import { CommonModule } from "@angular/common";
import { setCookie } from "../utils/cookies";

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

    ngOnInit(): void {
        this.authForm = this.fb.group({
            username: ['', Validators.required],
            email: [''],
            password: ['', Validators.required]
        });

        // this.user$.subscribe(user => {
        //     if (user) {
        //         this.onSuccess();
        //         this.router.navigate(['/dashboard']);
        //     }
        // });
    }

    onSubmit() {
        if (!this.authForm.valid) {
            console.log("invalid form");
            Object.keys(this.authForm.controls).forEach(controlName => {
                const control = this.authForm.get(controlName);
                if (control && control.invalid) {
                    console.log(`${controlName} is invalid:`, control.errors);
                }
            });
    
            return;
        }

        const { username, email, password } = this.authForm.value;

        if (this.isLoginMode) {
            this.store.dispatch(loginStart({ username, password }));
            fetch("http://localhost:3000/api/user/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            }
            ).then(response => response.json()).then(data => {
                console.log(data);
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 8);
                this.store.dispatch(loginSuccess({ user: data.user, token: "boo hoo", expiration: expirationDate }));
                this.onSuccess();
            } ).catch(err => {
                console.log("found error:", err)
                this.store.dispatch(loginFailure({ error: "Login failed. Please try again!" }));
            });
        } else {
            console.log("hello", JSON.stringify({ username, email, password }))
            this.store.dispatch(registerStart({ username, email, password }))
            fetch("http://localhost:3000/api/user/signup/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include'
            }
            ).then(response => response.json()).then(data => {
                console.log(data);
                this.store.dispatch(registerSuccess({ user: data.user, token: "boo hoo" }));
                this.onSuccess();
            } ).catch(err => {
                console.log("found error:", err)
                this.store.dispatch(registerFailure({ error: err }));
            });
        }
    }

    onSuccess() {
        setCookie();
        setCookie(`uName=${this.authForm.value.username}`);
        setCookie(`expiresAt=${new Date().getTime() + 8 * 60 * 60 * 1000}`);
        this.router.navigate(['/dashboard']);
    }

    toggleAuthMode() {
        this.isLoginMode = !this.isLoginMode;
    }
}

