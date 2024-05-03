import React, { useState, useEffect } from 'react';
import Tooltip from '@uiw/react-tooltip';
import HeatMap from '@uiw/react-heat-map';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = ({tasks}) => {
    const [data, setData] = useState([]);
    // for each day, the number of tasks.
    const [maxDay, setMaxDay] = useState(0);
    const [minDay, setMinDay] = useState(0);

    const formatDate = (date) => {
        const d = new Date(date);
        const formatted = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
        console.log(formatted)
        return formatted;
    }

    useEffect(() => {
        // for each task, get the date and count the number of tasks on that day
        const taskDates = tasks.filter(task => task.datetime).map(task => formatDate(task.datetime));
        const counts = taskDates.reduce((acc, date) => {
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        const result = Object.keys(counts).map(date => ({ date: date, count: counts[date] }));
        console.log(result);
        setData(result)
    }, [tasks]);

  return (
    <div style={{textAlign: 'center'}}>
        {/* <div style={{margin:'4px'}}>Task Heatmap</div> */}
        <div style={{margin:'12px', display: 'flex', justifyContent: 'center'}}>
      <HeatMap
        width={600}
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
    </div>
  )
}

export default Heatmap;