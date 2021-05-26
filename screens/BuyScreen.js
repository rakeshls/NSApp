import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import MyHeader from '../components/MyHeader'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {ListItem} from 'react-native-elements'
import db from '../config'
export default class Buy extends React.Component{
    constructor(){
        super();
        this.state={
            requestedBooksList : []
        }
        this.requestRef=null
    }
    getRequestedBooksList =()=>{
        this.requestRef = db.collection("Items")
        .onSnapshot((snapshot)=>{
          var requestedBooksList = snapshot.docs.map(document => document.data());
          this.setState({
            requestedBooksList : requestedBooksList
          });
        })
      }
    
      componentDidMount(){
        this.getRequestedBooksList()
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
          key={i}
          title={item.itemName}
          subtitle={item.Price}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity style={styles.button}
              onPress={()=>{
                alert('hello')
                this.props.navigation.navigate('RecvDetailsScreen',{'details':item})
              }} >
                <Text style={{color:'#ffff'}}>Buy</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
        )
      }
    
    render(){
        return(
          <SafeAreaProvider>
            <View style={{flex:1}}>
         <MyHeader title="NS App" navigation={this.props.navigation}/>
         <View style={{flex:1}}>
          {
            this.state.requestedBooksList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Itemms</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBooksList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
            </View>
            </SafeAreaProvider>
        )
    }
}
const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })