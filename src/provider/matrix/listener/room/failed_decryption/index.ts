/* eslint-disable @typescript-eslint/no-explicit-any */
export default async (roomId: string, event: any, error: Error) => {
    console.error(
        `Failed to decrypt ${roomId} ${event["event_id"]} because`,
        error,
    );
};
