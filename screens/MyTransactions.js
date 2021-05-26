import React,{Component} from 'react'
import {View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity} from 'react-native'
import {ListItem, Icon} from 'react-native-elements'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class myTranstionsScreen extends Component{
    constructor(){
        super()
        this.state={
       donorId:firebase.auth().currentUser.email,
       donorName:'',
       allTranstions:[]
        }
        this.requestRef=null
    }
    static navigationOptions={header:null}
    getDonorDetails=(donorId)=>{
     db.collection('Users').where('EmailId','==',donorId).get()
     .then((snapshot)=>{
         snapshot.forEach((doc)=> {
             this.setState({
                 'donorName':doc.data().FirstName
                 +" "+ doc.data().LastName
             })
         });
     })
    }
    getAllDonations =()=>{
        this.requestRef = db.collection("allTranstions").where("donorId" ,'==', this.state.donorId)
        .onSnapshot((snapshot)=>{
          var allTranstions = []
          snapshot.docs.map((doc) =>{
            var transtions = doc.data()
           transtions["docId"] = doc.id
           allTranstions.push(donation)
          });
          this.setState({
            allTranstions : allTranstions
          });
        })
      }
      sendBook=(bookDetails)=>{
        if(bookDetails.request_status === "Book Sent"){
          var requestStatus = "Donor Interested"
          db.collection("allTranstions").doc(bookDetails.docId).update({
            "requestStatus" : "Donor Interested"
          })
          this.sendNotification(bookDetails,requestStatus)
        }
        else{
          var requestStatus = "Book Sent"
          db.collection("allTranstions").doc(bookDetails.docId).update({
            "requestStatus" : "Book Sent"
          })
          this.sendNotification(bookDetails,requestStatus)
        }
      }
      sendNotification=(bookDetails,requestStatus)=>{
        var requestId = bookDetails.requestId
        var donorId = bookDetails.donorId
        db.collection("allNotifications")
        .where("requestId","==", requestId)
        .where("donorId","==",donorId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var message = ""
            if(requestStatus === "Book Sent"){
              message = this.state.donorName + " sent you book"
            }else{
               message =  this.state.donorName  + " has shown interest in donating the book"
            }
            db.collection("allNotifications").doc(doc.id).update({
              "message": message,
              "notificationStatus" : "unread",
              "date"                : firebase.firestore.FieldValue.serverTimestamp()
            })
          });
        })
      }
      keyExtractor = (item, index) => index.toString()
      
      renderItem = ( {item, i} ) =>(
        <ListItem
          key={i}
          title={item.book_name}
          subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
          leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity
               style={[
                 styles.button,
                 {
                   backgroundColor : item.request_status === "Book Sent" ? "green" : "#ff5722"
                 }
               ]}
               onPress = {()=>{
                 this.sendBook(item)
               }}
              >
                <Text style={{color:'#ffff'}}>{
                  item.request_status === "Book Sent" ? "Book Sent" : "Send Book"
                }</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
      )
    componentDidMount(){
        this.getDonorDetails(this.state.donorId)
        this.getAllDonations()
    }
    componentWillUnmount(){
      this.requestRef()
    }
    render(){
     return(
       <SafeAreaProvider>
        <View style={{flex:1}}>
       <MyHeader navigation={this.props.navigation} title="My Transaction"/>
        <View style={{flex:1}}>
          {
            this.state.allTranstions.length === 0
            ?(
              <View style={styles.subtitle}>
                <Text style={{ fontSize: 20}}>List of all Transaction</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allTranstions}
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
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })