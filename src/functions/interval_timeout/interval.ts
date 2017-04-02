/**
 * Created by abdou on 01/04/17.
 */
function $interval (func: any, time: number, intervals: intervalTimeout[])
{
    let tId: number;
    let i:   number;

    i = intervals.length;
    tId = setInterval(function () {
        if(!intervals[i].isPause){
            func()
        }
    },time);

    intervals.push(<intervalTimeout>{
        //todo clear interval
        pause:   ()=>{intervals[i].isPause = true},
        //todo restart interval
        unPause: ()=>{intervals[i].isPause = false},
        isPause: false,
        func:    func,
        time:    time,
        startAt: (new Date()).getTime(),
        tId:     tId
    });
    return (i);
}

function $clearInterval (tId: number, intervals: intervalTimeout[])
{
    clearInterval(intervals[tId].tId);
    intervals.splice(tId, 1);
}