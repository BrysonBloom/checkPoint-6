export class TowerEvent {
    constructor(data) {
        this.capacity = data.capacity;
        this.creatorId = data.creatorId;
        this.coverImg = data.coverImg;
        this.description = data.description;
        this.id = data.id;
        this.isCanceled = data.isCanceled;
        this.location = data.location;
        this.name = data.name;
        this.startDate = new Date(data.startDate);
        this.type = data.type;



    }
}