export class Comment {
    constructor(data) {
        this.creatorId = data.creatorId;
        this.eventId = data.eventId;
        this.body = data.body;
        this.isAttending = data.isAttending;
        this.creator = data.creator;
        this.id = data.id;
    }
}