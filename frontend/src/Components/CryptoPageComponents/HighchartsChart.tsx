import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Charter = ({ bigData, interval, currency }) => {
  const prices = bigData.map((dataPoint) => dataPoint.Price);
  const minValue = Math.min(...prices);
  const maxValue = Math.max(...prices);

  const formatYAxisLabel = (value) => {
    return '$' + value.toFixed(2);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const year = date.getFullYear();

    if (interval === '1d') {
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}`;
    } else if (interval === '7d') {
      if (timestamp) {
        return `${month} ${day}`;
      } else {
        return '';
      }
    } else if (interval === '30d') {
      if (day === 1 || day % 5 === 0) {
        return `${month} ${day}`;
      } else {
        return '';
      }
    } else if (interval === '1y') {
      if (day === 1) {
        return month;
      } else {
        return '';
      }
    }

    return '';
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const options = {
    title: {
      text: capitalizeFirstLetter(`${currency} - ${interval}`),
      style: {
        color: 'white',
      },
    },
    xAxis: {
      categories: bigData.map((dataPoint) =>
        formatTimestamp(dataPoint.Timestamp)
      ),
      labels: {
        style: {
          fontSize: '10px',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          textTransform: 'uppercase',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
      },
      crosshair: true,
      gridLineWidth: 1,
      gridLineColor: '#333333',
    },
    yAxis: {
      min: minValue,
      max: maxValue,
      labels: {
        formatter: function () {
          return formatYAxisLabel(this.value);
        },
        style: {
          fontSize: '10px',
          color: 'white',
        },
      },
      gridLineWidth: 1,
      gridLineColor: '#333333',
      crosshair: true,
    },
    chart: {
      backgroundColor: 'transparent',
      borderRadius: '3px',
    },
    tooltip: {
      formatter: function () {
        return formatYAxisLabel(this.y);
      },
    },
    series: [
      {
        name: 'Price',
        data: bigData.map((dataPoint) => [
          dataPoint.Timestamp,
          dataPoint.Price,
        ]),
        type: 'line',
        color: '#e43ec0',
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Charter;
