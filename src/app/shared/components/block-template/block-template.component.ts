import { Component } from '@angular/core';

@Component({
  selector: 'block-temp',
  styles: [`
    :host {
      text-align: center;
      color: #fff;
      font-weight: bolder;
      font-size: 1.25rem;
    }
  `],
  template: `
    <div class="block-ui-template">
    <img src="assets/logo.png" alt="Cargando..." height="50"/>
      <div><strong>{{message}}</strong></div>
    </div>
  `,
})
export class BlockTemplateComponent {
  message: any;
}
