import React, {Component} from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {fetchWeather} from './weatherAPI'

const iconNames = {
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella'
}

const phrases = {
  Default: {
    title: 'Cekaj da izmerim',
    subtitle: 'Strpi se...',
    background: '#9C9C9C'
  },
  Clear: {
    title: 'Vrime je bas lipo',
    subtitle: 'Nego sta',
    background: '#FFD017'
  },
  Rain: {
    title: 'Pada kisa, ubi misa',
    subtitle: 'Plaky',
    background: '#2f343A'
  },
  Thunderstorm: {
    title: 'Grmi, seva, trese se planeta',
    subtitle: 'Mamice',
    background: '#020202'    
  },
  Snow: {
    title: 'Pusti najvecu mecavu',
    subtitle: 'Do zore',
    background: '#15A678'    
  },
  Clouds: {
    title: 'Iza oblaka sunce sjajno sija',
    subtitle: 'Cija si nocas, cija?',
    background: '#939393'    
  },
  Drizzle: {
    title: 'Kisa pisa',
    subtitle: 'Bljack',
    background: '#1FBB68'    
  },
}

class App extends Component {

  state = {
    temp: 0,
    weather: 'Default'
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
        .then(res => this.setState({
          temp: Math.round(res.temp),
          weather: res.weather
        })),
      (error) =>  alert(error),
      {timeout: 10000}
    )
  }

  render() {
    return (
        <View style={[styles.container, {backgroundColor: phrases[this.state.weather].background}]}>
          <StatusBar hidden={true} />
          <View style={styles.header}>
            <Icon name={iconNames[this.state.weather]} size={80} color={'white'}></Icon>
            <Text style={styles.temp}>{this.state.temp}°</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{phrases[this.state.weather].title}</Text>
            <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017'
  },
  header: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  temp: {
    fontSize: 45,
    color: 'white'
  },
  body: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignItems: 'flex-start',
    margin: 10
  },
  title: {
    fontSize: 78,
    color: 'white',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: 'white'
  },
})

export default App