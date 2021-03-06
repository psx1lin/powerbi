export const SERVERpbiAD = 'http://pbi.mmh.org.tw/pbirole/mmh/pbiad';
export const SERVERpbiAPI = 'http://pbi.mmh.org.tw/pbirole/mmh/pbiapi';
export const SERVERpbi = 'https://oap2.mmh.org.tw/pfm';
export const SERVEReduapi = 'https://oap2.mmh.org.tw/eduapi';
export const SERVERdebug = 'http://localhost:3370';

export const URLs = {


  // powerbiapi

  Url_GetCatalogItems: `${SERVERpbiAPI}/GetCatalogItems?id=`,
  Url_GetCatalogItem: `${SERVERpbiAPI}/GetCatalogItem?id=`,
  Url_GetItemPoliciesById: `${SERVERpbiAPI}/GetItemPoliciesById?id=`,
  Url_GetTreeNode: `${SERVERpbiAPI}/GetTreeNode?id=`,
  Url_GetTreeData: `${SERVERpbiAPI}/GetTreeData?id=`,
  Url_GetCacheRefreshPlan: `${SERVERpbiAPI}/GetCacheRefreshPlan?id=`,
  
  // powerbi
  Url_Upload: `${SERVERpbi}/api/pbi/UploadFile`,
  Url_GetUploadInfo: `${SERVERpbi}/api/pbi/GetUploadInfo/`,
  Url_GetUploadInfoForKey: `${SERVERpbi}/api/pbi/GetUploadInfoForKey?`,
  Url_DelPBIForSeqno: `${SERVERpbi}/api/pbi/DelPBIForSeqno`,
  Url_PostPbiIsPublic: `${SERVERpbi}/api/pbi/PostPbiIsPublic`,

  // pbiuser
  Url_GetAllUser: `${SERVERpbiAD}/GetAllUser?id=`,
  Url_GetOAUser: `${SERVERpbiAD}/GetOAUser?e=`,
  Url_AddUser: `${SERVERpbiAD}/AddUser`,
  Url_SyncUserOA: `${SERVERpbiAD}/SyncUserOA`,
  Url_RemoveUser: `${SERVERpbiAD}/RemoveUser`,
  Url_GetOARecautocomplete: `${SERVERpbiAD}/GetOARecautocomplete?id=`,

  // pbigroup
  Url_GetAllGroup: `${SERVERpbiAD}/GetAllGroup?id=`,
  Url_GetUserGroups: `${SERVERpbiAD}/GetUserGroups?id=`,
  Url_GetGroupAllUser: `${SERVERpbiAD}/GetGroupAllUser?id=`,
  Url_AddGroup: `${SERVERpbiAD}/AddGroup`,
  Url_GroupAddUsers: `${SERVERpbiAD}/GroupAddUsers`,
  Url_GroupRemoveUsers: `${SERVERpbiAD}/GroupRemoveUsers`,
  


  // oa
  Url_GetCheckEmpnoInfo: `${SERVEReduapi}/api/oa/GetCheckEmpnoInfo?`,

  // roles
  Url_GetRoles: `${SERVEReduapi}/api/oa/GetRoles/`,


};
