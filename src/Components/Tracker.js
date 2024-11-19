import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../Utilities/AppColors';
import {DeviceWidth} from '../Utilities/Config';
const Tracker = ({activeIndex = 0}) => {
  return (
    <View style={styles.trackerContainer}>
      {Array.from({length: 3}).map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.trackerStyle,
              {
                width:
                  activeIndex == i
                    ? DeviceWidth * 0.1
                    : (DeviceWidth * 0.04) / i,
                backgroundColor:
                  activeIndex == i ? COLORS.APP_PRIMARY_COLOR : COLORS.GREY,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Tracker;

const styles = StyleSheet.create({
  trackerContainer: {flexDirection: 'row', alignSelf: 'center'},
  trackerStyle: {
    height: 6,
    marginBottom: 15,
    marginHorizontal: 2,
    borderRadius: 15,
  },
});
