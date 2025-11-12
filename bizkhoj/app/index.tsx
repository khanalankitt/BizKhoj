import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { SearchBar } from '@/components/search-bar';
import { CategoryCard } from '@/components/category-card';
import { TrendingSearches } from '@/components/trending-searches';

const categories = [
  { id: '1', name: 'Restaurants', icon: 'silverware-fork-knife' as const, colors: ['#10B981', '#059669'] as const },
  { id: '2', name: 'Electricians', icon: 'lightning-bolt' as const, colors: ['#F59E0B', '#D97706'] as const },
  { id: '3', name: 'Hospitals', icon: 'hospital-building' as const, colors: ['#EF4444', '#DC2626'] as const },
  { id: '4', name: 'Hotels', icon: 'bed' as const, colors: ['#8B5CF6', '#7C3AED'] as const },
  { id: '5', name: 'Shops', icon: 'shopping' as const, colors: ['#EC4899', '#DB2777'] as const },
  { id: '6', name: 'Mechanics', icon: 'car-wrench' as const, colors: ['#6366F1', '#4F46E5'] as const },
  { id: '7', name: 'Plumbers', icon: 'pipe-wrench' as const, colors: ['#06B6D4', '#0891B2'] as const },
  { id: '8', name: 'Salons', icon: 'content-cut' as const, colors: ['#F97316', '#EA580C'] as const },
  { id: '9', name: 'Gyms', icon: 'dumbbell' as const, colors: ['#14B8A6', '#0D9488'] as const },
  { id: '10', name: 'Pharmacies', icon: 'pill' as const, colors: ['#3B82F6', '#2563EB'] as const },
  { id: '11', name: 'Schools', icon: 'school' as const, colors: ['#A855F7', '#9333EA'] as const },
  { id: '12', name: 'Banks', icon: 'bank' as const, colors: ['#F43F5E', '#E11D48'] as const },
  { id: '13', name: 'Cafes', icon: 'coffee' as const, colors: ['#84CC16', '#65A30D'] as const },
  { id: '14', name: 'Doctors', icon: 'doctor' as const, colors: ['#0EA5E9', '#0284C7'] as const },
  { id: '15', name: 'Lawyers', icon: 'gavel' as const, colors: ['#64748B', '#475569'] as const },
  { id: '16', name: 'Tutors', icon: 'book-open-page-variant' as const, colors: ['#FB923C', '#F97316'] as const },
  { id: '17', name: 'Pet Care', icon: 'dog' as const, colors: ['#FDE047', '#FACC15'] as const },
  { id: '18', name: 'Cleaners', icon: 'broom' as const, colors: ['#22D3EE', '#06B6D4'] as const },
  { id: '19', name: 'Tailors', icon: 'needle' as const, colors: ['#C084FC', '#A855F7'] as const },
  { id: '20', name: 'Painters', icon: 'format-paint' as const, colors: ['#FCA5A5', '#F87171'] as const },
];

export default function Index() {
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const headerTranslateY = useSharedValue(0);
  const categoriesOpacity = useSharedValue(1);
  const categoriesTranslateY = useSharedValue(0);

  // Handle hardware/swipe back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isSearchFocused) {
        handleBackPress();
        return true; // Prevent default behavior
      }
      return false; // Let default behavior happen
    });

    return () => backHandler.remove();
  }, [isSearchFocused]);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    headerTranslateY.value = withSpring(-20, { damping: 20 });
    categoriesOpacity.value = withSpring(0, { damping: 20 });
    categoriesTranslateY.value = withSpring(20, { damping: 20 });
  };

  const handleSearchBlur = () => {
    if (!searchText) {
      setIsSearchFocused(false);
      headerTranslateY.value = withSpring(0, { damping: 20 });
      categoriesOpacity.value = withSpring(1, { damping: 20 });
      categoriesTranslateY.value = withSpring(0, { damping: 20 });
    }
  };

  const handleBackPress = () => {
    setIsSearchFocused(false);
    setSearchText('');
    headerTranslateY.value = withSpring(0, { damping: 20 });
    categoriesOpacity.value = withSpring(1, { damping: 20 });
    categoriesTranslateY.value = withSpring(0, { damping: 20 });
  };

  const handleTrendingSelect = (search: string) => {
    setSearchText(search);
  };

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const categoriesAnimatedStyle = useAnimatedStyle(() => ({
    opacity: categoriesOpacity.value,
    transform: [{ translateY: categoriesTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <SafeAreaView 
        style={styles.safeArea} 
        edges={isSearchFocused ? ['top', 'bottom'] : ['top']}
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          {isSearchFocused ? (
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={28} color="#374151" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="person-circle-outline" size={32} color="#374151" />
            </TouchableOpacity>
          )}
          <View style={styles.appNameContainer}>
            <Text style={styles.appNameBiz}>Biz</Text>
            <Text style={styles.appNameKhoj}>Khoj</Text>
          </View>
          <TouchableOpacity style={styles.headerIcon}>
            <View style={styles.notificationBadge} />
            <Ionicons name="notifications-outline" size={28} color="#374151" />
          </TouchableOpacity>
        </Animated.View>

        {/* Search Bar */}
        <SearchBar 
          value={searchText} 
          onChangeText={setSearchText}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />

        {/* Content - Categories or Trending Searches */}
        {isSearchFocused ? (
          <TrendingSearches onSearchSelect={handleTrendingSelect} />
        ) : (
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              <CategoryCard
                name={item.name}
                icon={item.icon}
                colors={item.colors}
                delay={index * 30}
                onPress={() => console.log(`${item.name} pressed`)}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    zIndex: 1,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 0.5,
  },
  appNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appNameBiz: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0D9488',
    letterSpacing: 0.5,
  },
  appNameKhoj: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F97316',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});

