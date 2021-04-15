
 export interface MMH_OPDGRP {
      seqno?: number;
      grp?: string;
      deleted?: string;
      oper?: string;
      opdate?: string;
 }

 export interface MMH_OPDITEM {
      seqno?: number;
      opd?: string;
      name?: string;
      deleted?: string;
      oper?: string;
      opdate?: string;
 }

 export interface MMH_OPDInv {
  pronum?: string;
  proseq?: string;
  proname?: string;
  opd?: string;
  grp?: string;
  loc?: string;
  note?: string;
  oper?: string;
  opername?: string;
  deleted?: string;
  opdate?: string;
}

 export interface NodeItemOPD {
  pronum?: string;
  proseq?: string;
  proname?: string;
  grp?: string;
  amountsr?: number;
  amountnew?: number;
}

 export interface NodeTreesOPD {
  data?: NodeItemOPD;
  children ?: NodeItemOPD[];
}


 export interface MMH_OPDCheck {
  pronum?: string;
  proseq?: string;
  grp?: string;
  opd?: string;
  amountsr?: number;
  amountnew?: number;
  note?: string;
  opdate?: string;
  oper?: string;
  opername?: string;
}
