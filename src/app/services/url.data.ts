export const SERVERpbiAD = 'http://pbi.mmh.org.tw/pbirole/mmh/pbiad';
export const SERVERpbi = 'https://oap2.mmh.org.tw/pfm';
export const SERVEReduapi = 'https://oap2.mmh.org.tw/eduapi';
export const SERVERdebug = 'http://localhost:3370';

export const URLs = {


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
