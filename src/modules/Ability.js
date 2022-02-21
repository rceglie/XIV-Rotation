export class Ability {
    constructor(params){
      this.ID = params[0];
      this.Name = params[1];
      this.comboAction = params[2];
      this.potency = params[3];
      this.comboPotency = params[4];
      this.mpCost = params[5];
      this.gauge = params[6];
      this.gaugeCost = params[7];
      this.gcd = params[8];
      this.buff = params[9];
    }
}