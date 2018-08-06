import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
	selector: 'upvote',
	template: `
		<div class="votingWidgetContainer pointable" (click)="onClick()">
			<div class="well votingWidget">
				<div class="votingButton">
					<i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
				</div>
				<div class="badge badge-inverse votingCount">
					<div>{{count}}</div>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent implements OnInit {
	@Input() count: number;
	
	// input setter
	@Input() set voted(val) {
		this.iconColor = val ? 'red' : 'white';
	};
	
	@Output() vote = new EventEmitter();
	public iconColor: string;

	constructor() { }

	ngOnInit(): void { }

	onClick() {
		this.vote.emit();
	}
}
