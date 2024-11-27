import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, {
            username,
            password
        });
    }

    signup(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, {
            email,
            password
        });
    }
}
