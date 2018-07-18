import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import * as SC from 'soundcloud';

import { environment } from '../environments/environment';
import { AppRouterModule } from 'src/app/router/router.module';
import { RouterModule } from '../../node_modules/@angular/router';

SC.initialize({
  client_id: environment.soundCloud_UerID,
  redirect_uri: environment.soundCloud_RedirectURL
});
const page_size = 150;
SC.get('tracks', { limit: page_size, linked_partitioning: 1 }).then(function (tracks) {
  console.log('Latest track: ' + tracks[0].title);
  console.log(tracks)
  console.log(tracks.length)
});


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
