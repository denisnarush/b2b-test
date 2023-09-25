export interface IDataEntry {
  id: string;
  int: number;
  float: string;
  color: string;
  child: {
    id: string;
    color: string;
  };
}
