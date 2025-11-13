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
      address: 'Thamel, Kathmandu',
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
      address: 'Durbar Marg, Kathmandu',
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
      address: 'Lazimpat, Kathmandu',
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
      address: 'Kupondole, Lalitpur',
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
      address: 'Jhamsikhel, Lalitpur',
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
  const [loading, setLoading] = useState(false);
  
  const categoryName = typeof slug === 'string' ? slug : 'Category';
  const businesses = getMockBusinesses(categoryName);

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
          <MaterialCommunityIcons name="whatsapp" size={16} color="green" />
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
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageGallery: {
    paddingTop: 12,
    height: 180,
  },
  imageGalleryContent: {
    paddingHorizontal: 12,
    gap: 10,
  },
  imageGalleryCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 220,
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e7eb',
  },
  content: {
    padding: 12,
  },
  header: {
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 3,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    fontSize: 13,
    color: '#666',
    marginLeft: 3,
    flex: 1,
  },
  distance: {
    fontSize: 12,
    color: 'green',
    backgroundColor: '#d1fae5',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    fontWeight: '600',
    marginLeft: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  openBadge: {
    backgroundColor: '#d1fae5',
  },
  closedBadge: {
    backgroundColor: '#fee2e2',
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 4,
  },
  openDot: {
    backgroundColor: '#10b981',
  },
  closedDot: {
    backgroundColor: '#ef4444',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  openText: {
    color: '#059669',
  },
  closedText: {
    color: '#dc2626',
  },
  hours: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
    paddingBottom: 10,
  },
  actionsScrollContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
    borderWidth: 1,
  },
  callButton: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  whatsappButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
  },
  directionButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
  },
  shareButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  actionButtonText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '600',
  },
});