import { trigger, style, animate, transition } from '@angular/animations';

export let fade = (
    trigger('fade', [
        transition('void => *', [
            style({ opacity: 0}),
            animate(700)
        ])
    ])
)