import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.config = {
      columns: [],
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render column headers based on config', () => {
    const mockConfig = {
      columns: [
        { alias: 'name', label: 'Name', width: '50%' },
        { alias: 'age', label: 'Age', width: '50%' },
      ],
    };

    component.config = mockConfig;
    fixture.detectChanges();

    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(2);
    expect(headers[0].nativeElement.textContent).toBe('name');
    expect(headers[1].nativeElement.textContent).toBe('age');
  });
});
