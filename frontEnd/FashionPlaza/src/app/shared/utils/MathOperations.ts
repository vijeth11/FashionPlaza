export const Range = function(end:number, start:number = 0){
    let range = []
    for(let i=start;i <= end; i++) {
        range.push(i);
    }
    return range;
}