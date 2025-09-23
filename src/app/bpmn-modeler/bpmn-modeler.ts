import { Component, ViewChild, ElementRef } from '@angular/core';
import Modeler from 'bpmn-js/lib/Modeler';
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import minimapModule from 'diagram-js-minimap';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-bpmn-modeler',
  standalone: false,
  templateUrl: './bpmn-modeler.html',
  styleUrl: './bpmn-modeler.scss'
})
export class BpmnModeler {
  private bpmnJS: Modeler;

  @ViewChild('bpmnModelerRef', { static: true }) private bpmnModelerRef: ElementRef | undefined;

  private url = '/public/bpmn-models/test.bpmn';

  constructor() {
    this.bpmnJS = new Modeler({
      container: this.bpmnModelerRef?.nativeElement,
      additionalModules: [
        BpmnColorPickerModule,
        minimapModule
      ]
    })
  }

  async ngAfterContentInit(): Promise<void> {
    const xml = await this.loadXml(this.url);
    this.bpmnJS.attachTo(this.bpmnModelerRef!.nativeElement);
    this.importDiagram(xml);

  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  private importDiagram(xml: string): Observable<{ warnings: Array<any> }> {
    return from(this.bpmnJS.importXML(xml) as Promise<{ warnings: Array<any> }>);
  }

  private async loadXml(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load XML from ${url}: ${response.statusText}`);
    }
    return response.text();
  }

}
