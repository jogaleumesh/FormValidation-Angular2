import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'field-error-display',
  templateUrl: './field-error-display.component.html',
  styles:[`
    .error-msg {
      color: #a94442;
    }
  `]
})
export class FieldErrorDisplayComponent{
  @Input() displayError: any;
}
