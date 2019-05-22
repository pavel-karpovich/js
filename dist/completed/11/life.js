
export class Man {
  plantTree() {
    console.log('Man must plant a tree - ✓');
  }
  raiseSon() {
    console.log('Man must raise a son - ✓');
  }
  buildHouse() {
    console.log('Man must build a house - ✓');
  }
  liveMansLife() {
    this.plantTree();
    this.raiseSon();
    this.buildHouse();
  }
}