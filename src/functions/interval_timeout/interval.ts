/**
 * Created by abdou on 01/04/17.
 */
function $interval (func: any, time: number, intervals: intervalTimeout[])
{
    let tId: number;
    let i:   number;

    i = intervals.length;
    tId = setInterval(function () {
        if(!intervals[i].pause){
            func()
        }
    },time);
    intervals.push(<intervalTimeout>{
        pause:   false,
        func:    func,
        time:    time,
        startAt: new Date(),
        tId:     tId
    });
    return (i);
}

function $clearInterval(tId: number, intervals: intervalTimeout[]) {
    clearInterval(intervals[tId].tId);
    intervals.splice(tId, 1);
}