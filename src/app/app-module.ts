import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { BpmnModeler } from './bpmn-modeler/bpmn-modeler';
import { WebProviderService } from '../lib/services/providers/web-provider';

@NgModule({
  declarations: [
    App,
    BpmnModeler
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    WebProviderService
  ],
  bootstrap: [App]
})
export class AppModule { }
