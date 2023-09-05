const statusWord = ["待专员联系","待前往面试","面试出结果中","请签合同","面试驳回","合同确认中","在职","离职","已取消投递"];
export function despStatus(status:number):string{
    return statusWord[status];
}

const coloredWord = ["blue","green","blue","orange","red","blue","green","gray","gray"];
export function coloredStatus(status:number):string{
    return `text-${coloredWord[status]}-500 dark:text-${coloredWord[status]}-400`;
}
