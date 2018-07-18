import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundcloudSearchContainerComponent } from './components/soundcloud-search-container/soundcloud-search-container.component';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';

export const routes: Routes = [
  {
    path: '', component: SoundcloudSearchContainerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SoundcloudSearchContainerComponent
  ]
})
export class SoundcloudSearchModule { }
