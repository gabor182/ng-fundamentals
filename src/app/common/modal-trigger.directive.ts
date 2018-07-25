import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQ_TOKEN } from './jquery.service';

@Directive({
	selector: '[modal-trigger]', // [] is a css selector indicating that this is an attribute, not an element
})
export class ModalTriggerDirective implements OnInit {
	@Input('modal-trigger') modalId: string; // the value of the attribute. Like this: modal-trigger="value"
	private el: HTMLElement; // native javascript object

	constructor(elRef: ElementRef, @Inject(JQ_TOKEN) private $: any) {
		this.el = elRef.nativeElement;
	}

	ngOnInit() {
		// subscribe to the button's click event (again, native javascript event)
		this.el.addEventListener('click', e => {
			this.$(`#${this.modalId}`).modal('show');
		});
	}
}