// export interface TreeNode {
//     data?: any;
//     children?: TreeNode[];
//     leaf?: boolean;
//     expanded?: boolean;    
// }

export interface Role {
    Name?: string;
    Description?: string;
}

export interface Policy {
    GroupUserName?: string;
    Roles?: Role[];
}

export interface ODataCatalogItemsID {
    Metadata?:  string;
    MetadataType?:  string;
    Id?:  string;
    Name?:  string;
    Description?:  string;
    Path?:  string;
    Type?:  string;
    Hidden?:  string;
    Size?:  string;
    ModifiedBy?:  string;
    ModifiedDate?:  string;
    CreatedBy?:  string;
    CreatedDate?:  string;
    ParentFolderId?:  string;
    IsFavorite?:  string;
    ContentType?:  string;
    Content?:  string;
    HasDataSources?:  string;
    Roles?:  Role[];
}

export interface ItemPolicy {
    Metadata?:  string;
    Id?:  string;
    InheritParentPolicy?:  boolean;
    Policies?:  Policy[];
}