import React, { useState, useEffect } from 'react';
import Tooltip from '@uiw/react-tooltip';
import HeatMap from '@uiw/react-heat-map';
import { Typography, Box } from '@mui/material';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = ({tasks, isEditMode}) => {
    const [data, setData] = useState([]);
    // for each day, the number of tasks.
    const [maxDay, setMaxDay] = useState({ date: '', count: 0 });
    const [minDay, setMinDay] = useState({ date: '', count: 100 });
    const [done, setDone] = useState(false);
    const [checkChange, setCheckChange] = useState(false);

    const formatDate = (date) => {
        const d = new Date(date);
        const formatted = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
        // console.log(formatted)
        return formatted;
    }

    useEffect(() => {
        console.log('tasks changed')
        console.log(isEditMode)
        if (Object.values(isEditMode).every(value => value === false)) {
            console.log('checking for changes')
            setCheckChange(!checkChange); // only check for changes if not in edit mode
        }
    }, [tasks]);

    useEffect(() => {
        // for each task, get the date and count the number of tasks on that day
        const taskDates = tasks.filter(task => task.datetime).map(task => formatDate(task.datetime));
        const counts = taskDates.reduce((acc, date) => {
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        const weekDates = [];
        let day = 0;
        while (weekDates.length < 1) {
            const d = new Date(new Date().setDate(new Date().getDate() + day));
            const formatted = formatDate(d);
            if (!taskDates.includes(formatted)) {
                weekDates.push(formatted);
            }
            day++;
        }
        const allDates = [...new Set([...taskDates, ...weekDates])];
        const result = allDates.map(date => ({ date: date, count: counts[date] || 0}));
        // console.log(result);
        setData(result)
        let max = 0;
        let min = 100;
        result.forEach(item => {
            if (item.count > max || (item.count === max && item.date < maxDay.date)) {
                // console.log('new max', item.date, item.count)
                setMaxDay({ date: item.date, count: item.count });
                max = item.count;
            }
            if (item.count < min || (item.count === min && item.date < minDay.date)) {
                // console.log('new min', item.date, item.count)
                setMinDay({ date: item.date, count: item.count });
                min = item.count;
            }
            if (item.date === formatDate(new Date())) {
                if (item.count === 0) {
                    setDone(true);
                } else {
                    setDone(false);
                }
            }
        });
    }, [checkChange, isEditMode]);

  return (
    <div style={{textAlign: 'center'}}>
        {/* <div style={{margin:'4px'}}>Task Heatmap</div> */}
        <div style={{margin:'12px', display: 'flex', justifyContent: 'center'}}>
      <HeatMap
        width={400}
        value={data}
        legendCellSize={12}
        startDate={new Date(new Date().setDate(new Date().getDate() - 70))}
        // endDate={new Date(new Date().setDate(new Date().getDate() + 70))}
        panelColors={{
            1: '#e1ecf7',
            2: '#aecbeb',
            3: '#83b0e1',
            5: '#71a5de',
            10: '#3a6ea5',
          }}
        // if this is enabled please roll over very slowly
        rectRender={(props, data) => {
        // if (!data.count) return <rect {...props} />;
        return (
            <Tooltip placement="top" content={`count: ${data.count || 0}`}>
            <rect {...props} />
            </Tooltip>
        );
        }}
      />
      </div>
      <div>{done && (
            <Box fontWeight={'bold'}>
                <div style={{ backgroundColor: '#f0f0f0', padding: '0 20px', borderRadius: '5px', display: 'inline-block'}}>
                <p>Great job! You've completed all your tasks for today!</p>
                </div>
            </Box>
        
        )}</div>
      <div>
      {maxDay.count > 3 && (
            <Box fontWeight={'bold'}>
                <div style={{ backgroundColor: '#f0f0f0', padding: '0 20px', borderRadius: '5px', display: 'inline-block'}}>
                <p>Hey, you have {maxDay.count} tasks scheduled for {maxDay.date}. Consider doing them on {minDay.date} instead?</p>
                </div>
            </Box>
        )}
      </div>
    </div>
  )
}

export default Heatmap;