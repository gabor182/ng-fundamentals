import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ISession } from '../shared';

@Injectable()
export class VoterService {
	constructor(private http: HttpClient) {

	}

	deleteVoter(eventId: number, session: ISession, voterName: string) {
		session.voters = session.voters.filter(voter => voter !== voterName); // update client side

		const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
		this.http.delete(url)
			.pipe(catchError(this.handleError('addVoter', null)))
			.subscribe();
	}

	addVoter(eventId: number, session: ISession, voterName: string) {
		session.voters.push(voterName); // update client side

		const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
		this.http.post(url, {}, options)
			.pipe(catchError(this.handleError('addVoter', null)))
			.subscribe();
	}

	userHasVoted(session: ISession, voterName: string) {
		return session.voters.some(voter => voter === voterName);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			return of(result as T);
		}
	}
}