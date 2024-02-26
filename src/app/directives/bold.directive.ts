import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from "@angular/core";

@Directive({
    selector: '[bold]',
    standalone: true,
    host: {
        "(mouseenter)":"onMouseEnter()",
        "(mouseleave)":"onMouseLeave()",
    }
})

export class BoldDirective {
    @Input() selectedSize = "18px";
    @Input() defaultSize = "16px";

    private fontSize: string;
    private fontWeight: string = "normal";
    constructor() {
        this.fontSize = this.defaultSize;
    }

    @HostBinding("style.fontSize") get getFontSize() {
        return this.fontSize;
    }

    onMouseEnter() {
        this.fontWeight = 'bold';
        this.fontSize = this.selectedSize;
    }

    onMouseLeave() {
        this.fontWeight = 'normal';
        this.fontSize = this.selectedSize;
    }

    @HostListener('click') onClick() {
        alert('Hello Angular');
    }
}