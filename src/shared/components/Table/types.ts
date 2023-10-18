export interface TableProps {
  title?: string;
  data: any[];
  fields: any[];
  loading: boolean;
  linkAddNewRow?: string;
  dark?: boolean;
  border?: boolean;
  scopedSlots: any;
  itemsPerPage: number;
  refresh: any;
}
