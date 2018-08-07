import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { IUser } from './user.model';



@Injectable()
export class AuthService {
	currentUser: IUser;

	constructor(private http: HttpClient) { }

	loginUser(userName: string, password: string) {
		let loginInfo = { username: userName, password: password }
		let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

		return this.http.post('/api/login', loginInfo, options)
			.pipe(tap(data => { // called when response is available
				this.currentUser = <IUser>data['user']; // <IUser> casts data['user'] to IUser type
			}))
			.pipe(catchError(err => {
				return of(false);
			}));
	}

	updateCurrentUser(firstName: string, lastName: string) {
		this.currentUser.firstName = firstName;
		this.currentUser.lastName = lastName;
	}

	isAuthenticated(): boolean {
		return !!this.currentUser;
	}

	checkAuthenticationStatus() {
		this.http.get('/api/currentIdentity')
			.pipe(tap(data => {
				if (data instanceof Object) {
					this.currentUser = <IUser>data;
				}
			}))
			.subscribe();
  }

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			return of(result as T);
		}
	}
}