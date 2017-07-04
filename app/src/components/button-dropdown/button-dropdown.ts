import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * Generated class for the ButtonDropdownComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'button-dropdown',
  templateUrl: 'button-dropdown.html'
})
export class ButtonDropdownComponent {

  @Input() data;
  @Output() selected = new EventEmitter();

  public selectedOption: any;
  public isExpanded: boolean = false;
  private originalTitle;

  constructor() {

  }

  ngOnInit() {
    this.originalTitle = this.data.label;
  }

  toggleDropdown() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.data.label = this.originalTitle;
      return;
    }

    if (this.selectedOption) {
      this.data.label = this.selectedOption.text;
    }

  }

  public selectOption(option) {
    this.selectedOption = option;
    this.selected.emit(option);

    this.data.label = option.text;
    this.toggleDropdown();
  }

}
