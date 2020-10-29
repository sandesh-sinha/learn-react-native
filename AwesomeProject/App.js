import React , {useState} from 'react';
import {Button,  StyleSheet,  View,  Text,  TextInput, Dimensions, ScrollView} from 'react-native';
import {LineChart}  from 'react-native-chart-kit';
import  uuid from 'uuid';
/*
 tasks = [ {name : 'sandesh', data : [{desciption:'paani lana' , money : '100'}]} , ]
*/
import Todo from './Todo'
const App = ()  => {
  const [name, setName] = useState('');
  const [description , setDescription] = useState('')
  const [income, setIncome] = useState('');
  const [tasks, setTasks] = useState([
    {
      name : 's',
      totalIncome : 200,
      timestamp : new Date(),
      data : [
        {
          description : "bike repair",
          income : 200,
        }
      ]
    }
  ]);

  const handleClick = () => {
    const task = { name:name, totalIncome:income, data : [ {description : description, income: income}]};
    const present = tasks.filter( (task) => task.name===name);
    if(present.length!==0){
      present[0].totalIncome = parseInt(present[0].totalIncome) + parseInt(income);
      present[0].data = [...present[0].data, {description : description, income: income}];
      setTasks([...(tasks.filter((task)=> task.name!==name)) , present[0]]);
    }
    else{
      setTasks([task, ...tasks]);
    }
    setName('');
    setDescription('');
    setIncome('');
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}>Keep track of income</Text>
        <Text>Name</Text>
        <TextInput placeholder='enter your name' value={name} onChangeText={text => setName(text)}  style={styles.textInput}/>
        <Text>Description</Text>
        <TextInput placeholder='enter job description' value={description} onChangeText={text => setDescription(text)}  style={styles.textInput}/>
        <Text>Income</Text>
        <TextInput placeholder='enter your income in ₹' value={income} onChangeText={text => setIncome(text)}  style={styles.textInput} keyboardType='numeric'/>
        <Button disabled={!name && !description && !income} title ='Add Income' onPress={handleClick} style={styles.button}/>
        { tasks.map(task => (
            <View key={uuid()}>
              <Text>Name: {task.name} , Total Income: ₹{task.totalIncome}</Text>
              {task.data.map(doc => (
                <View key={uuid()} style={styles.inline}>
                  <Text>Description: {doc.description} and </Text>
                  <Text>Income: ₹{doc.income}</Text>
                </View>
              ))}
            </View>
          )
        )}
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
      </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inline :{
    flexDirection : 'row',

  },
  container : {
    margin: 5,
    marginTop : 20,
  },
  titleText : {
    textAlign : 'center',
    fontSize : 40,
    color : 'blue',
  },
  button : {
    marginLeft : 10,
  },
  textInput : {
    height : 40,
    borderColor : 'red',
    borderWidth : 1,
    minWidth : 200,
    padding: 5,
    margin : 10,
  },
  view : {
    margin : 10,
  }
});

export default App;
