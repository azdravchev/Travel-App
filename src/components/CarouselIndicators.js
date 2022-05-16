import React, {useMemo, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {colors, sizes} from '../constants/theme';

const CarouselIndicators = ({
  slidesCount,
  dotSize,
  dotSpacing,
  slideWidth,
  scrollAnimated,
}) => {
  const slides = useRef(Array.from(Array(slidesCount).keys())).current;

  const {inputRange, translateOutputRange, widthOutputRange} = useMemo(
    () =>
      slides.reduce(
        (acc, _, index, arr) => {
          const width = slideWidth * index;
          const translateX = index * (dotSize + dotSpacing);
          acc.inputRange.push(width);
          acc.translateOutputRange.push(translateX);
          acc.widthOutputRange.push(dotSize);

          if (index < arr.length - 1) {
            acc.inputRange.push(width + slideWidth / 2);
            acc.translateOutputRange.push(translateX);
            acc.widthOutputRange.push(dotSize * 2 + dotSpacing);
          }
          return acc;
        },
        {inputRange: [], translateOutputRange: [], widthOutputRange: []},
      ),
    [dotSize, dotSpacing, slideWidth, slides],
  );

  return (
    <View style={styles.container}>
      {slides.map((_, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                marginHorizontal: dotSpacing / 2,
              },
            ]}
          />
        );
      })}
      <Animated.View
        style={[
          styles.indicator,
          {
            height: dotSize,
            left: dotSpacing / 2 + 2,
            transform: [
              {
                translateX: scrollAnimated.interpolate({
                  inputRange,
                  outputRange: translateOutputRange,
                }),
              },
            ],
            width: scrollAnimated.interpolate({
              inputRange,
              outputRange: widthOutputRange,
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 2,
    paddingVertical: 4,
    borderRadius: sizes.radius,
  },
  dot: {
    backgroundColor: colors.primary,
    opacity: 0.3,
    borderRadius: 12,
  },
  indicator: {
    position: 'absolute',
    backgroundColor: colors.primary,
    borderRadius: sizes.radius,
    top: 4,
  },
});

export default CarouselIndicators;
