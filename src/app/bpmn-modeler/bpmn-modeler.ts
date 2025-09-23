import { Component, ViewChild, ElementRef, OnInit, OnDestroy, OnChanges } from '@angular/core';
import Modeler from 'bpmn-js/lib/Modeler';
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import minimapModule from 'diagram-js-minimap';
import { from, Observable } from 'rxjs';
import { WebProviderService } from '../../lib/services/providers/web-provider';

@Component({
  selector: 'app-bpmn-modeler',
  standalone: false,
  templateUrl: './bpmn-modeler.html',
  styleUrl: './bpmn-modeler.scss'
})
export class BpmnModeler implements OnInit, OnDestroy, OnChanges {
  private bpmnJS: Modeler;

  @ViewChild('bpmnModelerRef', { static: true }) private bpmnModelerRef: ElementRef | undefined;

  constructor(private webProviderService: WebProviderService) {
    this.bpmnJS = new Modeler({
      container: this.bpmnModelerRef?.nativeElement,
      additionalModules: [
        BpmnColorPickerModule,
        minimapModule
      ]
    })
  }

  async ngOnInit(): Promise<void> {
    await this.ngOnChanges();
  }

  async ngOnChanges(): Promise<void> {
    const xml = await this.webProviderService.read('bpmn-models', 'test.bpmn');    
    if (xml !== undefined)
      this.bpmnJS.attachTo(this.bpmnModelerRef!.nativeElement);
      this.importDiagram(xml);
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  private importDiagram(xml: string): Observable<{ warnings: Array<any> }> {
    return from(this.bpmnJS.importXML(xml) as Promise<{ warnings: Array<any> }>);
  }

}
