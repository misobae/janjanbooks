import ApexCharts from 'react-apexcharts'

interface ReadingStatsChartProps {
  categories: string[];
  data: number[];
}
function ReadingStatsChart({ categories, data }: ReadingStatsChartProps) {
  return (
    <ApexCharts
      type="line"
      height={300}
      options={{
        chart: {
          background: "transparent",
          toolbar: { show: false },
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 500
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
          },
          background: {
            enabled: true,
            foreColor: '#fff',
            borderRadius: 2,
            padding: 4,
            opacity: 0.9,
            borderWidth: 1,
            borderColor: '#fff'
          },
        },
        colors: ["#1e40af"],
        stroke: {
          curve: "smooth",
          width: 4
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          show: false,
        },
        grid: {
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        tooltip: {
          enabled: false,
        }    
      }}
      series={[{
        name: "read status",
        data: data ?? [],
      }]}
    />  
  )
}

export default ReadingStatsChart;