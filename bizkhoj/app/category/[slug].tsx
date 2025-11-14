import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
  ScrollView,
  Share,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocation } from '../../contexts/location-context';

interface Business {
  id: string;
  name: string;
  images: string[];
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  phone: string;
  category: string;
}

// Mock data - replace with actual API call
const getMockBusinesses = (category: string): Business[] => {
  const businesses: Business[] = [
    {
      id: '1',
      name: 'Elegant Hair Studio',
      images: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
        'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400',
      ],
      rating: 4.8,
      reviewCount: 234,
      address: 'Damak, Jhapa',
      distance: '0.8 km',
      isOpen: true,
      openTime: '10:00 AM',
      closeTime: '8:00 PM',
      phone: '+977 9841234567',
      category: 'Salons',
    },
    {
      id: '2',
      name: 'Style Icon Salon',
      images: [
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      ],
      rating: 4.6,
      reviewCount: 189,
      address: 'Birtamode, Jhapa',
      distance: '1.2 km',
      isOpen: true,
      openTime: '9:00 AM',
      closeTime: '7:00 PM',
      phone: '+977 9841234568',
      category: 'Salons',
    },
    {
      id: '3',
      name: 'The Grooming Lounge',
      images: [
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      ],
      rating: 4.9,
      reviewCount: 312,
      address: 'Bhadrapur, Jhapa',
      distance: '2.1 km',
      isOpen: false,
      openTime: '10:00 AM',
      closeTime: '8:00 PM',
      phone: '+977 9841234569',
      category: 'Salons',
    },
    {
      id: '4',
      name: 'Bella Hair & Spa',
      images: [
        'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400',
      ],
      rating: 4.7,
      reviewCount: 156,
      address: 'Kathmandu, Nepal',
      distance: '3.4 km',
      isOpen: true,
      openTime: '10:00 AM',
      closeTime: '9:00 PM',
      phone: '+977 9841234570',
      category: 'Salons',
    },
    {
      id: '5',
      name: 'Premium Cuts',
      images: [
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
      ],
      rating: 4.5,
      reviewCount: 98,
      address: 'Bhadrapur, Nepal',
      distance: '4.2 km',
      isOpen: true,
      openTime: '9:30 AM',
      closeTime: '7:30 PM',
      phone: '+977 9841234571',
      category: 'Salons',
    },
  ];
  
  return businesses;
};

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams();
  const { selectedLocation } = useLocation();
  const [loading, setLoading] = useState(false);
  
  const categoryName = typeof slug === 'string' ? slug : 'Category';
  
  // Filter businesses based on selected location
  const allBusinesses = getMockBusinesses(categoryName);
  const businesses = selectedLocation
    ? allBusinesses.filter(b => b.address.includes(selectedLocation))
    : allBusinesses;

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    Linking.openURL(`whatsapp://send?phone=${cleanPhone}`);
  };

  const handleDirections = (address: string) => {
    const query = encodeURIComponent(address);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  const handleShare = async (business: Business) => {
    try {
      await Share.share({
        message: `Check out ${business.name} on BizKhoj!\nRating: ${business.rating}⭐\nAddress: ${business.address}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBusinessPress = (business: Business) => {
    router.push({
      pathname: '/business/[id]',
      params: { id: business.id },
    });
  };

  const renderBusinessCard = ({ item }: { item: Business }) => (
    <View style={styles.card}>
      {/* Image Gallery */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}
        contentContainerStyle={[
          styles.imageGalleryContent,
          item.images.length === 1 && styles.imageGalleryCentered
        ]}
      >
        {item.images.map((image, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => handleBusinessPress(item)}
            style={styles.imageWrapper}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content Section */}
      <TouchableOpacity
        style={styles.content}
        onPress={() => handleBusinessPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={13} color="#FFA500" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={13} color="#666" />
          <Text style={styles.address} numberOfLines={1}>
            {item.address}
          </Text>
          <Text style={styles.distance}>• {item.distance}</Text>
        </View>

        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, item.isOpen ? styles.openBadge : styles.closedBadge]}>
            <View style={[styles.statusDot, item.isOpen ? styles.openDot : styles.closedDot]} />
            <Text style={[styles.statusText, item.isOpen ? styles.openText : styles.closedText]}>
              {item.isOpen ? 'Open' : 'Closed'}
            </Text>
          </View>
          <Text style={styles.hours}>
            {item.openTime} - {item.closeTime}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Action Buttons - Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsScrollContent}
        style={styles.actions}
      >
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={(e) => {
            e.stopPropagation();
            handleCall(item.phone);
          }}
        >
          <Ionicons name="call" size={16} color="#fff" />
          <Text style={styles.callButtonText}>Call Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.whatsappButton]}
          onPress={(e) => {
            e.stopPropagation();
            handleWhatsApp(item.phone);
          }}
        >
            <MaterialCommunityIcons name="whatsapp" size={20} color="#25D366" />
          <Text style={styles.actionButtonText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.directionButton]}
          onPress={(e) => {
            e.stopPropagation();
            handleDirections(item.address);
          }}
        >
          <Ionicons name="navigate" size={16} color="#000" />
          <Text style={styles.actionButtonText}>Direction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.shareButton]}
          onPress={(e) => {
            e.stopPropagation();
            handleShare(item);
          }}
        >
          <Ionicons name="share-social" size={16} color="#000" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{categoryName}</Text>
            <Text style={styles.subtitle}>{businesses.length} places found</Text>
          </View>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => router.push('/location-selection')}
          >
            <Ionicons name="location-sharp" size={16} color="#0D9488" />
            <Text style={styles.locationText} numberOfLines={1}>
              {selectedLocation || 'Choose Location'}
            </Text>
            <Ionicons name="chevron-down" size={14} color="#666" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#14b8a6" />
        </View>
      ) : (
        <FlatList
          data={businesses}
          renderItem={renderBusinessCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageGallery: {
    height: 160,
  },
  imageGalleryContent: {
    paddingLeft: 12,
    paddingVertical: 12,
    gap: 10,
  },
  imageGalleryCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
  },
  imageWrapper: {
    width: 240,
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e7eb',
  },
  content: {
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  rating: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#D97706',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 6,
    flex: 1,
  },
  distance: {
    fontSize: 12,
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    fontWeight: '600',
    marginLeft: 8,
    overflow: 'hidden',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  openBadge: {
    backgroundColor: '#D1FAE5',
  },
  closedBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  openDot: {
    backgroundColor: '#10B981',
  },
  closedDot: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  openText: {
    color: '#065F46',
  },
  closedText: {
    color: '#991B1B',
  },
  hours: {
    fontSize: 13,
    color: '#4B5563',
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingVertical: 8,
  },
  actionsScrollContent: {
    paddingHorizontal: 12,
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
  },
  callButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  whatsappButton: {
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
  },
  directionButton: {
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
  },
  shareButton: {
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  actionButtonText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    maxWidth: 150,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginHorizontal: 4,
    flexShrink: 1,
  },
});