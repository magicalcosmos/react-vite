// page list
export interface IPage {
  pageIndex: number;
  pageSize: number;
  sortKey: string | Array<string>;
  isAsc: boolean;
}

export interface IUserPage {
  IPage;
  onlineOrNot: number;
  roleId: Array<string | number>;
  keyword: string;
}
