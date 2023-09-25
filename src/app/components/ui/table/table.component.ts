import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITableConfig, ITableTemplate } from './table.interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input('config') config!: ITableConfig;
  @Input('data') data: Array<unknown> | null = null;
  @Input('templates') templates: ITableTemplate = {};

  public identify(index: number, item: any) {
    return item.id;
  }
}
