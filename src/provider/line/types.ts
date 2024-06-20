export type Profile = {
    displayName: string;
    userId: string;
    pictureUrl?: string;
};

export type SourceInfo = {
    chatId: string;
    fromId: string|undefined;
};
