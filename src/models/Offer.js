class Offer {
  constructor(title, type) {
    this.title = title;
    this.type = type;
    this.createdAt = new Date();
    this.deletedAt = null;
    this.candidates = [];
  }
}

export default Offer;
