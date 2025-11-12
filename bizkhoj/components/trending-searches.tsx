import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

interface TrendingSearchesProps {
  onSearchSelect: (search: string) => void;
}

const trendingSearches = [
  { id: 1, text: 'Best restaurants near me', icon: 'trending-up' as const },
  { id: 2, text: 'Emergency plumber', icon: 'water' as const },
  { id: 3, text: '24/7 pharmacies', icon: 'medical' as const },
  { id: 4, text: 'AC repair service', icon: 'snow' as const },
  { id: 5, text: 'Car mechanic nearby', icon: 'car-sport' as const },
  { id: 6, text: 'Hair salons', icon: 'cut' as const },
  { id: 7, text: 'Pizza delivery', icon: 'pizza' as const },
  { id: 8, text: 'Gym membership', icon: 'barbell' as const },
  { id: 9, text: 'Hotels with parking', icon: 'bed' as const },
  { id: 10, text: 'Electrician service', icon: 'flash' as const },
];

export function TrendingSearches({ onSearchSelect }: TrendingSearchesProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withSpring(1, { damping: 20 });
    translateY.value = withSpring(0, { damping: 20 });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Ionicons name="flame" size={20} color="#EF4444" />
        <Text style={styles.title}>Trending Searches</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {trendingSearches.map((item, index) => (
          <TrendingItem
            key={item.id}
            text={item.text}
            icon={item.icon}
            delay={index * 40}
            onPress={() => onSearchSelect(item.text)}
          />
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </Animated.View>
  );
}

interface TrendingItemProps {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  delay: number;
  onPress: () => void;
}

function TrendingItem({ text, icon, delay, onPress }: TrendingItemProps) {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-20);

  useEffect(() => {
    opacity.value = withDelay(delay, withSpring(1));
    translateX.value = withDelay(delay, withSpring(0));
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
        <Ionicons name={icon} size={20} color="#6B7280" style={styles.itemIcon} />
        <Text style={styles.itemText}>{text}</Text>
        <Ionicons name="arrow-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
  },
  bottomSpacing: {
    height: 20,
  },
});
