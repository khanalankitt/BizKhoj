import React, { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, TextInput, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface SearchBarProps {
  onChangeText?: (text: string) => void;
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

export interface SearchBarRef {
  blur: () => void;
}

const placeholders = [
  'Search plumbers...',
  'Find restaurants...',
  'Discover nearby shops...',
  'Look for electricians...',
  'Explore hospitals...',
  'Find hotels...',
];

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
  ({ onChangeText, value, onFocus, onBlur, autoFocus }, ref) => {
    const [currentPlaceholder, setCurrentPlaceholder] = React.useState(placeholders[0]);
    const [isFocused, setIsFocused] = React.useState(false);
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(1);
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      blur: () => {
        inputRef.current?.blur();
      },
    }));

    useEffect(() => {
    if (isFocused || value) return; // Don't animate placeholder when focused or when there's text

    let currentIndex = 0;

    const interval = setInterval(() => {
      // Slide out current placeholder
      translateY.value = withTiming(-20, { duration: 300, easing: Easing.ease }, () => {
        opacity.value = 0;
      });
      opacity.value = withTiming(0, { duration: 300, easing: Easing.ease });

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % placeholders.length;
        setCurrentPlaceholder(placeholders[currentIndex]);

        // Reset position and slide in new placeholder
        translateY.value = 20;
        opacity.value = 0;

        translateY.value = withTiming(0, { duration: 300, easing: Easing.ease });
        opacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
      }, 350);
    }, 3000);

    return () => clearInterval(interval);
  }, [isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }));

    const handleContainerPress = () => {
      inputRef.current?.focus();
    };

    return (
      <Pressable style={styles.container} onPress={handleContainerPress}>
        <Ionicons name="search" size={18} color="#9CA3AF" style={styles.icon} />
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus={autoFocus}
            placeholderTextColor="transparent"
          />
          {!value && !isFocused && (
            <Animated.Text style={[styles.animatedPlaceholder, animatedStyle]}>
              {currentPlaceholder}
            </Animated.Text>
          )}
          {!value && isFocused && (
            <Text style={styles.staticPlaceholder}>Search for services...</Text>
          )}
        </View>
      </Pressable>
    );
  }
);const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 12,
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
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  input: {
    fontSize: 15,
    color: '#111827',
    padding: 0,
    margin: 0,
    height: 18,
  },
  animatedPlaceholder: {
    position: 'absolute',
    fontSize: 15,
    color: '#9CA3AF',
    left: 0,
    top: -1,
  },
  staticPlaceholder: {
    position: 'absolute',
    fontSize: 15,
    color: '#9CA3AF',
    left: 0,
    top: 0,
  },
});
