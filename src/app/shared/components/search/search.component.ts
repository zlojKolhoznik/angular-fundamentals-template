import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.

  @Input() placeholder: string = 'Search...';
  @Output() search: (query: string) => void = (query: string) => query;

  searchQuery: string = '';
}

