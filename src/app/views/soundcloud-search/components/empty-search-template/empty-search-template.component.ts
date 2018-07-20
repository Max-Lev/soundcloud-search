import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-empty-search-template',
  templateUrl: './empty-search-template.component.html',
  styleUrls: ['./empty-search-template.component.scss']
})
export class EmptySearchTemplateComponent implements OnInit, OnDestroy {

  title: string;

  constructor() { };

  ngOnInit() { };

  ngOnDestroy(): void { };

}
