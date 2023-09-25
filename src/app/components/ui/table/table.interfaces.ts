import { TemplateRef } from '@angular/core';

export interface ITableConfig {
  columns: Array<{
    alias: string;
    label: string;
    width?: string;
  }>;
}

export interface ITableTemplate {
  [K: string]: TemplateRef<unknown>;
}
