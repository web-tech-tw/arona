// Import dependencies.
import {
    store,
} from "../memory";

/**
 * Notify Link
 */
export default class NotifyLink {
    chatId: string;
    accessToken?: string;

    /**
     * Constructor
     * @param {Partial<NotifyLink>} init {chatId: string, accessToken: string}
     */
    constructor(init: Partial<NotifyLink>) {
        Object.assign(this, init);
    }

    /**
     * Find the link by chat type and chat ID, new one if not found.
     * @param {string} chatId - The chat ID.
     * @return {NotifyLink} The link.
     */
    static use(chatId: string): NotifyLink {
        const {notifyLinks} = store.data;
        const matcher = (link: NotifyLink) => {
            return link && link.chatId === chatId;
        };
        const link = notifyLinks.find(matcher);
        if (link) {
            // Construct the link.
            return new NotifyLink(link);
        }

        // New link.
        return new NotifyLink({chatId});
    }

    /**
     * Get the index of the link, returns -1 if not found.
     * @return {number} The index.
     */
    index(): number {
        const {notifyLinks} = store.data;
        const matcher = (link: NotifyLink) =>
            link && link.chatId === this.chatId;
        return notifyLinks.findIndex(matcher);
    }

    /**
     * Check if the link exists.
     * @return {boolean} The result.
     */
    exists(): boolean {
        return this.index() !== -1;
    }

    /**
     * Save the link.
     * @return {void}
     */
    save(): void {
        if (this.exists()) {
            this.remove();
        }
        store.data.notifyLinks = [...store.data.notifyLinks, this];
        store.write();
    }

    /**
     * Remove the link.
     * @return {void}
     */
    remove(): void {
        if (!this.exists()) {
            return;
        }
        const matcher = (link: NotifyLink) =>
            link && link.chatId !== this.chatId;
        store.data.notifyLinks = [...store.data.notifyLinks.filter(matcher)];
        store.write();
    }
}
