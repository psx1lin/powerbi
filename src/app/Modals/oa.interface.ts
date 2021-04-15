export interface IfmPSN_ctrl {
  GRP?:   string;
  DOCNAME?:   string;
  NOTENAME?:   string;
  FMI_ISSHOW?:   number;
  ISMMH_ISSHOW?:   number;
  FORMTYPE?:   string;
  ISMMH_ID?:   string;
  ISMMH_NAME?:   string;
  FDATE_NAME?:   string;
  TDATE_NAME?:   string;
  FIELD1_NAME?:   string;
  FIELD1_ISSHOW?:   number;
  REASON_NAME?:   string;
  REASON_ISSHOW?:   string;
  REASON_ID?:   string;
  FIELD2_NAME?:   string;
  FIELD3_NAME?:   string;
  FIELD4_NAME?:   string;
  FIELD5_NAME?:   string;
  FORM_NOTE?:   string;
  FIELD_DD1?:   string;
  FIELD_DD1_NAME?:   string;
  FLOW?:   string;
}

export interface OA_EmpInfo {
  empno: string;
  name?: string;
}
