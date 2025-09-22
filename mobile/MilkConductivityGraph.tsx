import { View,Text, Dimensions } from "react-native"
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const ConductivityGraph = () => {
    return (
<View style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}}>
    <Text style={{
        fontSize: 25,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    }}>Milk Conductivity</Text>
  <LineChart
    data={{
      labels: ["Sunday", "Tuesday", "Wednesday", "  Thursday", "Friday"],
      datasets: [
        {
          data: [
            4.2,
            6.6,
            5.3,
            4.5,
            4.8
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width - 10}
    height={270}
    yAxisLabel="mS"
    yAxisSuffix="mS"
    yAxisInterval={1} 
    chartConfig={{

      backgroundColor: "#484848ff",
      backgroundGradientFrom: "#ff6464ff",
      backgroundGradientTo: "#ff4747ff",
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      },
      propsForLabels: {
        fontSize: 12
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
)
}
export default ConductivityGraph;