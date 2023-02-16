import * as React from 'react';
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from '../Header'

const ProfileGender = ({navigation}) => {


    return (
        <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
        <View style={{flex:1}}>

            <Header name="What is your gender?" />

            <View style={styles.container}>

                <Button icon="gender-male"
                    mode="outlined"
                    style={styles.button}
                    onPress={() => {}}>
                        Male
                </Button>

                <Button icon="gender-female"
                    mode="outlined"
                    style={styles.button}
                    onPress={() => {}}>
                        Female
                </Button>


            <Button icon="gender-male-female"
                mode="outlined"
                style={styles.button}
                onPress={() => {}}>
                    Other
            </Button>
            </View>

            <Button icon="chevron-right"
            mode="contained"
            style={{margin:20}}
            onPress={() => navigation.navigate("ProfileInterests")}>
                Continue
            </Button>
        </View>
        </>


      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
  button: {
    //backgroundColor: 'green',
    width: '40%',
    height: 100,
    flex: 1,
    flexDirection:"column",
    justifyContent:"center"
  },
//  other: {
//      flex:1,
//      width: '40%',
//      height: 100,
//      flexDirection:"column",
//      justifyContent:"center"
//    }

});

export default ProfileGender;