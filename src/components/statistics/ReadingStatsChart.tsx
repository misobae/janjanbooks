import { ResponsiveLine } from '@nivo/line';
interface ChartData {
  x: string;
  y: number;
}
interface ChartDataSet {
  id: string;
  color: string;
  data: ChartData[];
}
interface ReadingStatsChartProps {
  data: ChartDataSet[];
}

function ReadingStatsChart({ data }: ReadingStatsChartProps ) {
  return (
    <div className='h-[240px]'>
      <ResponsiveLine
        data={data}
        layers={['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends']}
        margin={{ top: 32, right: 16, bottom: 32, left: 16 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: '',
            legendOffset: 0,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        colors={['rgb(29 78 216)']}
        theme={{
          dots: {
              text: {
                  fill: '#ffffff',
              },
          },
        }}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        lineWidth={3}
        pointSize={20}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={1}
        pointBorderColor={{ theme: 'background' }}
        enablePoints={true}
        enablePointLabel={true}
        pointLabel="y"
        pointLabelYOffset={4}
        areaOpacity={0}
        areaBlendMode="normal"
        crosshairType="x"
        areaBaselineValue="0"
        role="0"
        enableArea={false}
        enableCrosshair={false}
        isInteractive={false}
        useMesh={false}
        debugMesh={false}
        enableSlices={false}
        debugSlices={false}
        legends={[]}
        fill={[]}
        defs={[]}
        tooltip={() => null} 
        sliceTooltip={() => null} 
    />
    </div>
  )
}

export default ReadingStatsChart;