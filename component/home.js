

// import { search } from 'imdb-api';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text,ScrollView,Dimensions, View,TouchableOpacity,Image } from 'react-native';
const {width,height} = Dimensions.get('screen')
import AntDesign from 'react-native-vector-icons/AntDesign'
var j=1;

export default class App extends Component {

    state = {
      data: [],
      tdata:[],
      isLoading: false,
      isFetching: false,
      sdsd:false,
    //   tmparr: [],

    };
  
fetchData=()=>{
    // try{
        this.setState({tdata:[]})
    fetch('https://randomuser.me/api/?inc=name,email,picture&&results=10')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tdata: json.results })
        console.log(this.state.tdata)
      })
      .then(()=>{
          this.setState({data:[]})
        for(var i=0;i<10;i++) {    
                
            this.state.data.push({
                "id":   i, 
                "firstName" : this.state.tdata[i]['name']['first'],
                "lastName"  : this.state.tdata[i]['name']['last'],
                "title"       : this.state.tdata[i]['name']['title'],
                "image" :   this.state.tdata[i]['picture']["large"],
                "email" :   this.state.tdata[i]['email']
            });
        }
        console.log('//////////////////////////');
        
    }
      )
      .then(()=>{
        this.setState({ isFetching: false })

    this.setState({ isLoading: false });
})
    //   .catch((error) => console.error(error))

}
refresh=()=>{

    this.setState({ isFetching: true })
    this.fetchData()
    console.log('refreshhhhh');

    


}
deleteItemById = (id) => {
    const filteredData = this.state.data.filter(item => item.id !== id);
    this.setState({ data: filteredData });
    // console.log(filteredData);
  }



loadMore=()=>{
    this.setState({isLoading:true})
      console.log('ddddonwwwwwwwwwweeeeee');
var i;

var temp=[];

try{
this.setState({tdata:[]})
      fetch('https://randomuser.me/api/?inc=name,email,picture&&results=10')
      .then((response) => response.json())
      .then((json) => {
        // this.setState({ tdata: json.results })
        temp=json.results
        // console.log(this.state.tdata)
    

        // console.log(this.state.data);
    }
      )
      .then(()=>{
        // console.log(temp);
            // for(i=0;i<10;i++,j++) { 
                for(i in temp){ 
                    console.log(j+i);
                    this.state.data.push({
                            "id":   j+i, 
                            "firstName" : temp[i]['name']['first'],
                            "lastName"  : temp[i]['name']['last'],
                            "title"       : temp[i]['name']['title'],
                            "image" :   temp[i]['picture']["large"],
                            "email" :   temp[i]['email']
                        });  
                // console.log(temp[i]['name']);
                }
                j+=1
    console.log('//////////////////////////');
      })
      .then(()=>{this.setState({isLoading:false})})
      .finally(() => {
    this.setState({ isFetching: false })
    // this.setState({ isLoading: false });
      });
}
catch(error){
    console.error(error);
}

  }
  componentDidMount() {
    console.log('////////////////////////////////////////////////////////////');
    this.fetchData();

  }


  render() {
    // const { data, isLoading } = this.state;
    

    return (
      <View style={{paddingTop:50,backgroundColor:'#121212' }}>
{/* <ScrollView> */}
        {/* {isLoading ? <ActivityIndicator/> : ( */}
          <FlatList
          contentContainerStyle={{ paddingBottom: 100}}
        //   scrollToEnd({})
        // invertedS
          style={{backgroundColor:'black',borderRadius:10}}
            data={this.state.data}
            onRefresh={()=>{this.refresh()}}
            refreshing={this.state.isFetching}
            // horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <ScrollView horizontal >
                    <View style={{width:width-20,height:100,backgroundColor:'#42504D',borderRadius:20,margin:10,flexDirection:'row'}}>
                <Image source={{uri:item.image}} style={{height:100,alignSelf:'center',width:100,borderRadius:50}}/>
                    <View style={{marginLeft:10,alignSelf:'center'}}>
                    <Text style={{color:'white',marginBottom:10}}>{item.title} {item.firstName} {item.lastName}</Text>
                    <Text style={{color:'white'}}>{item.email}</Text>
                    </View>
                    </View>
                    <TouchableOpacity style={{alignSelf:'center',alignItems:'center',justifyContent:'center',}} onPress={()=>{this.deleteItemById(item.id),console.log('remove')}}>
                    <View style={{alignSelf:'center',alignItems:'center',justifyContent:'center',backgroundColor:'red',borderRadius:20,height:100,width:100}}>
                            <AntDesign name='delete' style={{color:'white'}} size={30} />
                            <Text style={{color:'white'}}>Remove</Text>
                    </View>
                    </TouchableOpacity>
                    </ScrollView>
                    

            )}
            onEndReached={() => this.loadMore()}
            onEndReachedThreshold={0.5}
          />


          {this.state.isLoading&&
          <ActivityIndicator style={{marginTop:-100}} size={'large'} color='white'/>
          }

      </View>
    );
  }
};



