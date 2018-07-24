import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared';

@Component({
	selector: 'session-list',
	templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnInit, OnChanges {
	@Input() sessions: ISession[];
	@Input() filterBy: string;
	visibleSessions: ISession[] = [];

	constructor() { }

	ngOnInit(): void { }

	ngOnChanges(): void {
		if (!this.sessions) {
			return;
		}

		this.filterSessions(this.filterBy);
	}

	filterSessions(filter: string) {
		if (filter === 'all') {
			this.visibleSessions = this.sessions.slice(0);
		} else {
			this.visibleSessions = this.sessions.filter(s => s.level.toLocaleLowerCase() === filter);
		}
	}
}
