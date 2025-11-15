import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
  Share,
  TextInput,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Rating } from "react-native-ratings";
import { Review } from "../utils/types";
import { isBusinessOpenNow } from "../utils/helperFunctions";
import { getBusinessDetailsById } from "../utils/data";

const { width } = Dimensions.get("window");

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const businessId = typeof id === "string" ? id : "";
  const business = getBusinessDetailsById(businessId);
  const isOpen = isBusinessOpenNow(business.openTime, business.closeTime);

  const handleCall = () => {
    Linking.openURL(`tel:${business.phone}`);
  };

  const handleWhatsApp = () => {
    const cleanPhone = business.phone.replace(/[^0-9]/g, "");
    Linking.openURL(`whatsapp://send?phone=${cleanPhone}`);
  };

  const handleDirections = () => {
    const query = encodeURIComponent(business.address);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  const handleWebsite = () => {
    if (business.website) {
      Linking.openURL(business.website);
    }
  };

  const handleReviewSubmit = () => {
    if (newReview.trim() === "") {
      alert("Please write a review before submitting.");
      return;
    }
    console.log("Submitted Review:", { rating: newRating, comment: newReview });
    // Here you would typically send the review to your backend
    alert("Thank you for your review!");
    setNewReview("");
    setNewRating(3);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${business.name} on BizKhoj!\nRating: ${business.rating}⭐\nAddress: ${business.address}\n${business.phone}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically save to backend or local storage
    if (!isFavorite) {
      console.log("Added to favorites:", business.name);
      // You could show a toast notification here
    } else {
      console.log("Removed from favorites:", business.name);
    }
  };

  const handleScroll = (event: any) => {
    const slideSize = width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentImageIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery - Horizontal Scroll */}
        <View style={styles.imageContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {business.images.map((image: string, index: number) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.mainImage}
              />
            ))}
          </ScrollView>

          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent"]}
            style={styles.imageOverlay}
          >
            <SafeAreaView edges={["top"]}>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={handleToggleFavorite}
                >
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={24}
                    color={isFavorite ? "#ef4444" : "#fff"}
                  />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </LinearGradient>

          {/* Image Pagination */}
          <View style={styles.imagePagination}>
            {business.images.map((_: string, index: number) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentImageIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.name}>{business.name}</Text>
              <Text style={styles.priceRange}>{business.priceRange}</Text>
            </View>

            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={18} color="#FFA500" />
                <Text style={styles.rating}>{business.rating}</Text>
                <Text style={styles.reviewCount}>
                  ({business.reviewCount} reviews)
                </Text>
              </View>
              <Text style={styles.category}>{business.category}</Text>
            </View>
          </View>

          {/* Status & Hours */}
          <View style={styles.section}>
            <View style={styles.statusCard}>
              <View style={styles.statusLeft}>
                <View
                  style={[
                    styles.statusBadge,
                    isOpen ? styles.openBadge : styles.closedBadge,
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      isOpen ? styles.openDot : styles.closedDot,
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      isOpen ? styles.openText : styles.closedText,
                    ]}
                  >
                    {isOpen ? "Open Now" : "Closed"}
                  </Text>
                </View>
                <Text style={styles.hours}>
                  {business.openTime} - {business.closeTime}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons - Horizontal Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actionsScrollContent}
            style={styles.actionButtonsContainer}
          >
            <TouchableOpacity
              style={[styles.actionBtn, styles.callBtn]}
              onPress={handleCall}
            >
              <Ionicons name="call" size={18} color="#fff" />
              <Text style={styles.callBtnText}>Call Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.whatsappBtn]}
              onPress={handleWhatsApp}
            >
              <MaterialCommunityIcons
                name="whatsapp"
                size={18}
                color="#374151"
              />
              <Text style={styles.actionBtnText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.directionBtn]}
              onPress={handleDirections}
            >
              <Ionicons name="navigate" size={18} color="#374151" />
              <Text style={styles.actionBtnText}>Direction</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.shareBtn]}
              onPress={handleShare}
            >
              <Ionicons name="share-social" size={18} color="#374151" />
              <Text style={styles.actionBtnText}>Share</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationCard}>
              <Ionicons name="location" size={20} color="#14b8a6" />
              <View style={styles.locationText}>
                <Text style={styles.address}>{business.address}</Text>
                <Text style={styles.distance}>{business.distance} away</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{business.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {business.amenities.map((amenity: string, index: number) => (
                <View key={index} style={styles.amenityChip}>
                  <Ionicons name="checkmark-circle" size={16} color="#14b8a6" />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Write a Review */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Write a Review</Text>
            <View style={styles.reviewInputContainer}>
              <View style={styles.ratingSection}>
                <Text style={styles.ratingLabel}>Your Rating</Text>
                <Rating
                  type="custom"
                  ratingCount={5}
                  imageSize={40}
                  startingValue={3}
                  onFinishRating={(rating: number) => setNewRating(rating)}
                  tintColor="#ffffff"
                  ratingColor="#FFA500"
                  ratingBackgroundColor="#D1D5DB"
                  style={{ paddingVertical: 10 }}
                />
              </View>
              <TextInput
                style={styles.reviewTextInput}
                placeholder="Share your experience..."
                placeholderTextColor="#9CA3AF"
                multiline
                value={newReview}
                onChangeText={setNewReview}
              />
              <TouchableOpacity
                style={styles.submitReviewButton}
                onPress={handleReviewSubmit}
              >
                <Text style={styles.submitReviewButtonText}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Reviews ({business.reviews.length})
            </Text>
            {business.reviews.length > 0 ? (
              business.reviews.map((review: Review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Image
                      source={{ uri: review.avatar }}
                      style={styles.reviewAvatar}
                    />
                    <View style={styles.reviewAuthorContainer}>
                      <Text style={styles.reviewAuthor}>{review.author}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                    <View style={styles.reviewRating}>
                      <Ionicons name="star" size={16} color="#FFA500" />
                      <Text style={styles.reviewRatingText}>
                        {review.rating.toFixed(1)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))
            ) : (
              <View style={styles.noReviewsContainer}>
                <Text style={styles.noReviewsText}>
                  No reviews yet. Be the first to review!
                </Text>
              </View>
            )}
          </View>

          {/* Contact Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
              <View style={styles.contactIconContainer}>
                <Ionicons name="call" size={20} color="#14b8a6" />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{business.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            {business.website && (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={handleWebsite}
              >
                <View style={styles.contactIconContainer}>
                  <Ionicons name="globe" size={20} color="#14b8a6" />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactLabel}>Website</Text>
                  <Text style={styles.contactValue}>Visit website</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    height: 280,
  },
  mainImage: {
    width: width,
    height: 280,
    backgroundColor: "#e5e7eb",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 6,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePagination: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  paginationDotActive: {
    backgroundColor: "#fff",
    width: 20,
  },
  content: {
    padding: 14,
  },
  header: {
    marginBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    flex: 1,
  },
  priceRange: {
    fontSize: 16,
    fontWeight: "600",
    color: "#14b8a6",
    marginLeft: 10,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginLeft: 5,
  },
  reviewCount: {
    fontSize: 13,
    color: "#666",
    marginLeft: 3,
  },
  category: {
    fontSize: 13,
    color: "#666",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  statusCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 12,
  },
  statusLeft: {
    gap: 6,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  openBadge: {
    backgroundColor: "#d1fae5",
  },
  closedBadge: {
    backgroundColor: "#fee2e2",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  openDot: {
    backgroundColor: "#10b981",
  },
  closedDot: {
    backgroundColor: "#ef4444",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  openText: {
    color: "#059669",
  },
  closedText: {
    color: "#dc2626",
  },
  hours: {
    fontSize: 13,
    color: "#666",
  },
  actionButtonsContainer: {
    marginBottom: 14,
  },
  actionsScrollContent: {
    paddingLeft: 2,
    paddingRight: 14,
    gap: 8,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
  },
  callBtn: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  whatsappBtn: {
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
  },
  directionBtn: {
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
  },
  shareBtn: {
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
  },
  callBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  actionBtnText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
  },
  locationText: {
    marginLeft: 12,
    flex: 1,
  },
  address: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    marginBottom: 4,
  },
  distance: {
    fontSize: 13,
    color: "#666",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdfa",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccfbf1",
  },
  amenityText: {
    fontSize: 13,
    color: "#0f766e",
    marginLeft: 6,
    fontWeight: "500",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e6f7f5",
    justifyContent: "center",
    alignItems: "center",
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  reviewInputContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
  },
  ratingSection: {
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  ratingLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  reviewTextInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 14,
    marginBottom: 12,
  },
  submitReviewButton: {
    backgroundColor: "#14b8a6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitReviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  reviewCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewAuthorContainer: {
    flex: 1,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  noReviewsContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  noReviewsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
