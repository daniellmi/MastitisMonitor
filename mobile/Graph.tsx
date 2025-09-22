
import { Dimensions, Text, View } from "react-native";
import {
  LineChart
} from "react-native-chart-kit";

const Graph = () => {
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
    }}>pH Acidity</Text>
  <LineChart
    data={{
      labels: ["Sunday", "Tuesday", "Wednesday", "  Thursday", "Friday"],
      datasets: [
        {
          data: [
            6.7,
            6.6,
            6.6,
            7.4,
            7.7
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width - 10} // from react-native
    height={270}
    yAxisLabel="pH"
    yAxisSuffix="pH"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{

      backgroundColor: "#ffffffff",
      backgroundGradientFrom: "#ff6464ff",
      backgroundGradientTo: "#ff4747ff",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ff0000ff"
      },
      propsForLabels: {
        fontSize:16
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
export default Graph;