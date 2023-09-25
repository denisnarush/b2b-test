import { ITableConfig } from '../../../components/ui/table/table.interfaces';

export const TableConfig: ITableConfig = {
  columns: [
    { alias: 'id', label: 'Id', width: '0px' },
    { alias: 'int', label: 'Int' },
    { alias: 'float', label: 'Float' },
    { alias: 'color', label: 'Color', width: '200px' },
    { alias: 'child', label: 'Child', width: '300px' },
  ],
};

export const TableNestedConfig: ITableConfig = {
  columns: [
    { alias: 'id', label: 'Id', width: '0px' },
    { alias: 'color', label: 'Color' },
  ],
};
