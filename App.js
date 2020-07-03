import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  ActivityIndicator,

} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      page: 1,
      isLoading : false
    };
  }
  componentDidMount() {
    this.setState({isLoading:true},this.getData)
  }
  getData = () => {
    const apiURL =
      'https://jsonplaceholder.typicode.com/photos?_limit=5&_page='+this.state.page;
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          data : this.state.data.concat(resJson),
          isLoading:false
        });
       // console.log(resJson);
      });
  };
  renderRow = (item) => {
    return (
      <View style={styles.itemRow}>
        <Image source={{uri: item.url}} style={styles.imageStyle} />
        <Text numberOfLines={1} style={styles.textStyle}>
          {item.title}
        </Text>
        <Text style={styles.textStyle}>{item.id}</Text>
      </View>
    );
  };
    handelLoadMore=()=>{
      this.setState({page : this.state.page + 1,isLoading:true},this.getData)
    }

    renderFooter=()=>{
      return(
        this.state.isLoading ?
        <View style={styles.footer}>
          <ActivityIndicator size={'large'} />
        </View> : <></>
      )
    }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatStyle}
          data={this.state.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderRow(item)}
          onEndReached={this.handelLoadMore}
          onEndReachedThreshold={100}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flatStyle: {
    marginTop: 20,
    backgroundColor: '#f5fcff',
  },
  itemRow: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (width / 10) * 9,
    height: (width / 10) * 7,
    backgroundColor: '#efefef',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textStyle: {
    fontSize: 16,
    padding: 15,
  },
  imageStyle: {
    width: '90%',
    height: (width / 10) * 4,
    resizeMode: 'cover',
    borderRadius:15
  },
  footer:{
    width:width/10*9,
    alignItems:'center',
    marginTop:10,
    marginBottom:10
  }
});
