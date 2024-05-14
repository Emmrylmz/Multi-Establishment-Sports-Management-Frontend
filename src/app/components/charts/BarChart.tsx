import React from "react";
import { View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];
const BarChart = () => {
  return (
   <View className="items-center justify-center flex-1 mx-auto">
      <VictoryChart width={300} height={250} theme={VictoryTheme.material}  domainPadding={10} >
        <VictoryBar 
          data={data} 
          x="quarter" 
          y="earnings" 
          alignment={"start"} 
          style={
            { data: { 
                fill: "#3FA454" },
              labels:{
                color: "black",
              } 
            }
          } 
          barWidth={10} />
      </VictoryChart>
   </View>
  )
}


export default BarChart
