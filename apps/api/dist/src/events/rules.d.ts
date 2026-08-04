export declare function canAttendEvent(input: {
    published: boolean;
    startsAt: Date;
    now?: Date;
    goingCount: number;
    capacity: number | null;
    alreadyGoing: boolean;
}): {
    allowed: boolean;
    reason: "closed";
} | {
    allowed: boolean;
    reason: "full";
} | {
    allowed: boolean;
    reason: null;
};
