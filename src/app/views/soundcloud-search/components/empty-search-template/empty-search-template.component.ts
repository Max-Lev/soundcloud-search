import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-search-template',
  templateUrl: './empty-search-template.component.html',
  styleUrls: ['./empty-search-template.component.scss']
})
export class EmptySearchTemplateComponent implements OnInit {

  title: string;

  constructor() { }

  ngOnInit() {
  }

}
