import React from 'react'

import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

const LineChart = () => {
  return (
    <View  className='items-center justify-center'>
      <VictoryChart
      theme={VictoryTheme.material}
      width={300} height={250}  domainPadding={10}
    >
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc"}
        }}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 }
        ]}
        x={"x"}
        y={"y"}
      />
    </VictoryChart>
    </View>
  )
}

export default LineChart