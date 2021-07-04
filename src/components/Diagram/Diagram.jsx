import s from './Diagram.module.scss';

import { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';

const Diagram = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // получаем даты
    let dates = [];
    const datesRange = (startDate_, endDate_) => {
      let startDate = new Date(startDate_ + ' 00:00:00 UTC');
      let endDate = new Date(endDate_ + ' 00:00:00 UTC');
      const options = {
        month: 'short',
        day: 'numeric',
      };
      while (startDate <= endDate) {
        const locateUs = startDate.toLocaleString('en-US', options);
        dates.push(locateUs);
        startDate = new Date(
          Date.UTC(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + 1,
          ),
        );
      }
    };
    datesRange('2021-06-26', '2021-07-08');

    // cоздаем график
    const chart = () => {
      setChartData({
        labels: dates,
        datasets: [
          {
            // часы будут рассчитываться по формулам, пока что внесены рандомные
            label: 'Запланированные оставшиеся трудозатраты',
            // запланированные часы
            data: [130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
            fill: false,
            backgroundColor: '#FA3B3F',
            borderColor: '#FA3B3F',
          },
          {
            label: 'Актуальные оставшиеся трудозатраты в часах ',
            // фактические  часы
            data: [131, 115, 118, 102, 90, 85, 66, 60, 49, 43, 30, 22, 12],
            fill: false,
            backgroundColor: '#1988EE',
            borderColor: '#1988EE',
          },
        ],
      });
    };
    chart();
  }, []);

  return (
    <div>
      <h3 className={s.diagram_title}>BurnDown Chart (Calendar Team)</h3>
      {/* <Line
        data={chartData}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              // labels: {
              //   wigth: 10,
              // },
            },
            title: {
              display: true,
              position: 'left',
              text: 'Человеко-часы',
            },
          },
          layout: {
            padding: 20,
          },
        }}
      /> */}
    </div>
  );
};

export default Diagram;
