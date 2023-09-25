import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableConfig } from '@components/ui/table/table.interfaces';
import { TableConfig, TableNestedConfig } from './configs/table.config';
import { SocketService } from '@services/socket.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import {
  DEFAULT_ARRAY_SIZE,
  DEFAULT_DELAY_MS,
} from '@constants/default.values';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  dataEntries$ = this.socketService.getEntries$();
  config: ITableConfig = TableConfig;
  nested: ITableConfig = TableNestedConfig;

  form = this.formBuilder.nonNullable.group({
    delay: [DEFAULT_DELAY_MS, [Validators.required, Validators.min(0)]],
    size: [DEFAULT_ARRAY_SIZE, [Validators.required, Validators.min(1)]],
    additional: [''],
  });

  fromChanges$ = this.form.valueChanges.pipe(
    tap((settings) => this.socketService.setSettings(settings))
  );

  constructor(
    private socketService: SocketService,
    private formBuilder: FormBuilder
  ) {}

  get delay(): AbstractControl<number, number> | null {
    return this.form.get('delay');
  }
  get size(): AbstractControl<number, number> | null {
    return this.form.get('size');
  }
}
