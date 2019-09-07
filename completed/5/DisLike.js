
export class DisLike {
  
  constructor(likes = 0, dislikes = 0) {
      this.likes = likes;
      this.dislikes = dislikes;
  }
  
  reset() {
      this.likes = 0;
      this.dislikes = 0;
  }

  like() {
      this.likes++;
      return this.likes;
  }

  dislike() {
      this.dislikes++;
      return this.dislikes;
  }

}
