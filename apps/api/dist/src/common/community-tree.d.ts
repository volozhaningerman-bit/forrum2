export type CommunityNode = {
    id: string;
    parentId: string | null;
};
export declare function expandCommunityIds(nodes: CommunityNode[], roots: Iterable<string>): Set<string>;
