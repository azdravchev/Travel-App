import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors, sizes, spacing} from '../constants/theme';
import * as Animatable from 'react-native-animatable';

const TripDetailsCard = ({trip}) => {
  return (
    <View style={styles.card}>
      <Animatable.View
        style={styles.header}
        animation="fadeInUp"
        delay={500}
        easing="ease-in-out"
        duration={400}>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.location}>{trip.location}</Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  header: {
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.title,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.title,
    color: colors.white,
  },
});

export default TripDetailsCard;
