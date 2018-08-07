import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SessionListComponent } from './session-list.component';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';
import { UpvoteComponent } from './upvote.component';
import { DurationPipe } from '../shared/duration.pipe';
import { CollapsibleWellComponent } from '../../common/collapsible-well.component';

describe('SessionListComponent', () => {
	let fixture: ComponentFixture<SessionListComponent>,
		component: SessionListComponent,
		element: HTMLElement,
		debugEl: DebugElement;

	beforeEach(async(() => {
		let mockAuthService = {
			isAuthenticated: () => true,
			currentUser: {
				userName: 'Joe'
			}
		};
		let mockVoterService = {
			userHasVoted: () => true
		};

		TestBed.configureTestingModule({
			imports: [],
			declarations: [
				SessionListComponent,
				//UpvoteComponent, // not necessary because of the NO_ERRORS_SCHEMA
				DurationPipe,
				//CollapsibleWellComponent // not necessary because of the NO_ERRORS_SCHEMA
			],
			providers: [
				{ provide: AuthService, useValue: mockAuthService },
				{ provide: VoterService, useValue: mockVoterService }
			],
			schemas: [
				NO_ERRORS_SCHEMA // ignore all unrecognized HTML elements (like other components' selectors)
			]
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SessionListComponent);
		component = fixture.componentInstance;
		debugEl = fixture.debugElement;
		element = fixture.nativeElement;
	});

	describe('initial display', () => {
		it('should have the correct session title', () => {
			component.sessions = [{
				id: 3, 
				name: 'Session 1', 
				presenter: 'Joe', 
				duration: 1, 
				level: 'beginner', 
				abstract: 'abstract', 
				voters: ['john', 'bob']
			}];
			component.filterBy = 'all';
			component.sortBy = 'name';
			component.eventId = 4;

			component.ngOnChanges();
			fixture.detectChanges(); // check for changes in the component and re-render the html

			//expect(element.querySelector('[well-title]').textContent).toContain('Session 1');

			expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
		});
	});
});