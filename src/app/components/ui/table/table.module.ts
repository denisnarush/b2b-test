import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { GetValueByPathPipe } from './table.pipes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TableComponent, GetValueByPathPipe],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
