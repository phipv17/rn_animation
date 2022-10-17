/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StatusBar,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  LogBox,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {faker} from '@faker-js/faker';
import {img_bg} from './assets/index';

//disable all warning
LogBox.ignoreAllLogs();

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${
      faker.datatype.number() % 2 === 0 ? 'men' : 'women'
    }/${faker.datatype.number(60)}.jpg`,
    name: faker.name.fullName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

// console.log(DATA);

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  // const
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar hidden />
      <Image
        source={img_bg}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item?.key}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const inputRangeCard = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: inputRangeCard,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                opacity,
                transform: [{scale}],
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(255,255,255,0.9)',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                borderRadius: 10,
              }}>
              <Image
                source={{uri: item?.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE / 2,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text
                  style={{fontSize: 20, fontWeight: '700', overflow: 'hidden'}}>
                  {item?.name}
                </Text>
                <Text
                  style={{fontSize: 16, fontWeight: '500'}}
                  ellipsizeMode="head"
                  numberOfLines={1}>
                  {item?.email}
                </Text>
                <Text>{item?.jobTitle}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
