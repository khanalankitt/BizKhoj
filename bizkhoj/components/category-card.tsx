import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

interface CategoryCardProps {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  colors: readonly [string, string, ...string[]];
  delay?: number;
  onPress?: () => void;
}

export function CategoryCard({ name, icon, colors, delay = 0, onPress }: CategoryCardProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 15,
        stiffness: 100,
      })
    );
    opacity.value = withDelay(delay, withSpring(1));
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity 
        style={[styles.touchable, isPressed && styles.touchablePressed]} 
        onPress={onPress} 
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={0.95}
      >
        <LinearGradient colors={colors} style={styles.iconContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <MaterialCommunityIcons name={icon} size={22} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '25%',
    padding: 4,
  },
  touchable: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  touchablePressed: {
    backgroundColor: '#F3F4F6',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 14,
  },
});
