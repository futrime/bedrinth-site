/**
 * 输入数值，返回大概金额表示
 * @param money 多少钱
 * @returns 金额表示
 */
function despMoney(money: number): string {
  if (money < 1000) {
    return money.toFixed(0);
  } else {
    return (money/1000) + "k";
  }
}

export function parseSalary(low:number,type:string,high?:number):string{
    if(!high){
        return `${despMoney(low)} / ${type}起`
    }else if(low===high){
        return `${despMoney(low)} / ${type}`
    }else {
        return `${despMoney(low)}-${despMoney(high)} / ${type}`
    }
}