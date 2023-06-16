interface percentageFormat  {
    label: string
    value: number
}

export const perfectRoundOff = (num:number):number => {
    return Math.round(num * 10) / 10;
}

export const getPercentage = (a:number|undefined, b:number|undefined): [percentageFormat, percentageFormat] => {
    if(a === undefined || b === undefined) return [{label: "First", value: 0 }, {label: "Second", value: 0}];
    const total = a + b;
    const percentageOfValue_a = perfectRoundOff((a * 100) / total);
    const percentageOfValue_b = perfectRoundOff(100 - percentageOfValue_a);
    return [{label: "First", value: percentageOfValue_a }, {label: "Second", value: percentageOfValue_b}];
}