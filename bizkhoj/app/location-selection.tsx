import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Location from 'expo-location';

import { useLocation } from '@/contexts/location-context';

export default function LocationSelection() {
  const [searchText, setSearchText] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const { setSelectedLocation } = useLocation();

  const handleClose = () => {
    router.back();
  };

  const handleDetectLocation = async () => {
    setIsDetecting(true);
    try {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Please enable location permissions to detect your current location.',
          [{ text: 'OK' }]
        );
        setIsDetecting(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Reverse geocode to get address
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        const locationName = `${address.city || address.subregion || address.region || 'Unknown Location'}`;
        setSelectedLocation(locationName);
        router.back();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to detect location. Please try again.');
      console.error('Location detection error:', error);
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Location</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={28} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Start typing your location..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Detect Location Button */}
        <TouchableOpacity 
          style={styles.detectButton} 
          onPress={handleDetectLocation}
          disabled={isDetecting}
          activeOpacity={0.7}
        >
          <View style={styles.detectIconContainer}>
            {isDetecting ? (
              <ActivityIndicator size="small" color="#0D9488" />
            ) : (
              <Ionicons name="locate" size={24} color="#0D9488" />
            )}
          </View>
          <View style={styles.detectTextContainer}>
            <Text style={styles.detectTitle}>
              {isDetecting ? 'Detecting your location...' : 'Detect my location'}
            </Text>
            <Text style={styles.detectSubtitle}>
              {isDetecting ? 'Please wait' : 'Using GPS'}
            </Text>
          </View>
          {!isDetecting && (
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          )}
        </TouchableOpacity>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
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
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    padding: 0,
  },
  detectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    marginHorizontal: 20,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  detectIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detectTextContainer: {
    flex: 1,
  },
  detectTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0D9488',
    marginBottom: 2,
  },
  detectSubtitle: {
    fontSize: 13,
    color: '#14B8A6',
  },
});
