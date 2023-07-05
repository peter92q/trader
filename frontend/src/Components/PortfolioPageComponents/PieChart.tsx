import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import agent from '../../Configs/Axios/axios';
import { motion } from 'framer-motion';
import { zoomIn } from '../../Configs/FramerMotion/animations';

export default function PieChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await agent.requests.get('/Investment/purchases'); 
        const data = response;
        setChartData(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
      text: 'Portfolio:',
      style: {
        color: 'white'
      }
    },
    tooltip: {
      formatter: function() {
        return '<b>' +  '$' + this.y + '</b>';
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        colors: ['#ac1161', '#1a9fe4', '#7724c3', '#f79413', '#009393'],
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f}%',
        },
        showInLegend: true,
        states: {
          hover: {
            brightness: 0
          }
        },
        point: {
          events: {
            legendItemClick: function() {
              return false;
            }
          }
        },
      }
    },
    legend: {
      itemStyle: {
        color: 'white'
      }
    },
    series: [
      {
        name: 'Data',
        data: chartData.map(item => ({
          name: item.CryptoType,
          y: item.TotalInvestedAmount
        }))
      }
    ]
  };
  
  return (
    <motion.div
      variants={zoomIn(0.4, 1)}
    >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </motion.div>
  )
}
