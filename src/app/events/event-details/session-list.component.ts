import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';

@Component({
	selector: 'session-list',
	templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnInit, OnChanges {
	@Input() eventId: number;
	@Input() sessions: ISession[];
	@Input() filterBy: string;
	@Input() sortBy: string;

	visibleSessions: ISession[] = [];

	constructor(private authService: AuthService, private voterService: VoterService) { }

	ngOnInit(): void { }

	ngOnChanges(): void {
		if (!this.sessions) {
			return;
		}

		this.filterSessions(this.filterBy);
		this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
	}

	toggleVote(session: ISession) {
		if (this.userHasVoted(session)) {
			this.voterService.deleteVoter(this.eventId, session, this.authService.currentUser.userName);
		} else {
			this.voterService.addVoter(this.eventId, session, this.authService.currentUser.userName);
		}

		if (this.sortBy === 'votes') {
			this.visibleSessions.sort(sortByVotesDesc);
		}
	}

	userHasVoted(session: ISession) {
		return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
	}

	filterSessions(filter: string) {
		if (filter === 'all') {
			this.visibleSessions = this.sessions.slice(0);
		} else {
			this.visibleSessions = this.sessions.filter(s => s.level.toLocaleLowerCase() === filter);
		}
	}
}

function sortByNameAsc(s1: ISession, s2: ISession) {
	if (s1.name > s2.name) {
		return 1;
	} else if (s1.name === s2.name) {
		return 0;
	} else {
		return -1;
	}
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
	return s2.voters.length - s1.voters.length;
}
