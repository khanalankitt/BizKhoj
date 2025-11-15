import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const CATEGORIES = [
  'Restaurant',
  'Electrician',
  'Hospital',
  'Hotel',
  'Shop',
  'Mechanic',
  'Plumber',
  'Salon',
  'Gym',
  'Pharmacy',
  'School',
  'Bank',
  'Cafe',
  'Doctor',
  'Lawyer',
  'Tutor',
  'Pet Care',
  'Cleaner',
  'Tailor',
  'Painter',
];

export default function RegisterBusiness() {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState(false);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant permission to access your photos'
      );
      return;
    }

    setLoadingImages(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 5 - photos.length,
    });

    if (!result.canceled && result.assets) {
      const newPhotos = result.assets.map((asset) => asset.uri);
      setPhotos([...photos, ...newPhotos]);
    }
    setLoadingImages(false);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCustomCategory('');
    setShowCustomCategoryInput(false);
    setShowCategoryModal(false);
  };

  const handleCustomCategorySubmit = () => {
    if (customCategory.trim()) {
      setSelectedCategory(customCategory.trim());
      setShowCategoryModal(false);
      setShowCustomCategoryInput(false);
    } else {
      Alert.alert('Error', 'Please enter a category name');
    }
  };

  const handleSubmit = () => {
    if (
      !businessName ||
      !ownerName ||
      !address ||
      !city ||
      !selectedCategory
    ) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success!',
      'Your business registration has been submitted for review',
      [
        {
          text: 'OK',
          onPress: () => router.push('/'),
        },
      ]
    );
  };

  const isFormValid =
    businessName &&
    ownerName &&
    address &&
    city &&
    selectedCategory;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Business</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 3</Text>
        </View>

        {/* Form Grid */}
        <View style={styles.formGrid}>
          {/* Business Name */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Business Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Himalayan Coffee House"
              placeholderTextColor="#9CA3AF"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          {/* Owner Name */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Owner Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Ram Sharma"
              placeholderTextColor="#9CA3AF"
              value={ownerName}
              onChangeText={setOwnerName}
            />
          </View>
        </View>

        {/* Business Address */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Business Address <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Street address, landmarks..."
            placeholderTextColor="#9CA3AF"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={2}
            textAlignVertical="top"
          />
        </View>

        {/* City */}
        <View style={styles.section}>
          <Text style={styles.label}>
            City <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Kathmandu"
            placeholderTextColor="#9CA3AF"
            value={city}
            onChangeText={setCity}
          />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Category <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.labelHint}>Choose what best describes your business</Text>
          
          <TouchableOpacity
            style={styles.categorySelector}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={[styles.categorySelectorText, !selectedCategory && styles.placeholderText]}>
              {selectedCategory || 'Select a category'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell customers about your business..."
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.label}>Photos</Text>
          <Text style={styles.labelHint}>
            Add up to <Text style={styles.highlightText}>5 photos</Text> to showcase your business
          </Text>
          <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                style={styles.photoWrapper}
                onPress={() => setPreviewImage(photo)}
              >
                <Image source={{ uri: photo }} style={styles.photo} />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => removePhoto(index)}
                >
                  <Ionicons name="close-circle" size={24} color="#EF4444" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            {photos.length < 5 && (
              <TouchableOpacity
                style={styles.addPhotoButton}
                onPress={pickImages}
                disabled={loadingImages}
              >
                {loadingImages ? (
                  <ActivityIndicator size="small" color="#0D9488" />
                ) : (
                  <>
                    <Ionicons name="camera" size={28} color="#0D9488" />
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#0D9488" />
          <Text style={styles.infoText}>
            Your listing will be reviewed and published within{' '}
            <Text style={styles.infoHighlight}>24-48 hours</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !isFormValid && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.submitButtonText}>Submit Registration</Text>
        </TouchableOpacity>
      </View>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowCategoryModal(false);
                  setShowCustomCategoryInput(false);
                }}
              >
                <Ionicons name="close" size={28} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryOption,
                      selectedCategory === category && styles.categoryOptionSelected,
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        selectedCategory === category && styles.categoryOptionTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                    {selectedCategory === category && (
                      <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Custom Category Option */}
              {!showCustomCategoryInput ? (
                <TouchableOpacity
                  style={styles.customCategoryButton}
                  onPress={() => setShowCustomCategoryInput(true)}
                >
                  <Ionicons name="add-circle-outline" size={20} color="#0D9488" />
                  <Text style={styles.customCategoryButtonText}>Add Custom Category</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.customCategoryInput}>
                  <TextInput
                    style={styles.customInput}
                    placeholder="Enter custom category"
                    placeholderTextColor="#9CA3AF"
                    value={customCategory}
                    onChangeText={setCustomCategory}
                    autoFocus
                  />
                  <View style={styles.customInputButtons}>
                    <TouchableOpacity
                      style={styles.customInputButtonCancel}
                      onPress={() => {
                        setShowCustomCategoryInput(false);
                        setCustomCategory('');
                      }}
                    >
                      <Text style={styles.customInputButtonCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.customInputButtonSubmit}
                      onPress={handleCustomCategorySubmit}
                    >
                      <Text style={styles.customInputButtonSubmitText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        visible={previewImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPreviewImage(null)}
      >
        <View style={styles.previewOverlay}>
          <TouchableOpacity
            style={styles.previewCloseButton}
            onPress={() => setPreviewImage(null)}
          >
            <Ionicons name="close-circle" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          {previewImage && (
            <Image
              source={{ uri: previewImage }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdfff',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  formGrid: {
    gap: 16,
  },
  section: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  labelHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 10,
    marginTop: -2,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 80,
    paddingTop: 12,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  categorySelectorText: {
    fontSize: 15,
    color: '#111827',
    flex: 1,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  categoryScroll: {
    marginTop: 4,
  },
  categoryContent: {
    paddingRight: 20,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  categoryChipSelected: {
    backgroundColor: '#0D9488',
    borderColor: '#0D9488',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  photoWrapper: {
    position: 'relative',
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addPhotoButton: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0D9488',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDFA',
  },
  addPhotoText: {
    fontSize: 11,
    color: '#0D9488',
    marginTop: 4,
    fontWeight: '600',
  },
  highlightText: {
    fontWeight: '700',
    color: '#0D9488',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDFA',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    marginTop: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#115E59',
    marginLeft: 10,
    lineHeight: 18,
  },
  infoHighlight: {
    fontWeight: '700',
    color: '#0D9488',
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#0D9488',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0D9488',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalScroll: {
    paddingHorizontal: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 16,
  },
  categoryOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  categoryOptionSelected: {
    backgroundColor: '#0D9488',
    borderColor: '#0D9488',
  },
  categoryOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  categoryOptionTextSelected: {
    color: '#FFFFFF',
  },
  customCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#0D9488',
    borderStyle: 'dashed',
    backgroundColor: '#F0FDFA',
    marginTop: 8,
  },
  customCategoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D9488',
    marginLeft: 8,
  },
  customCategoryInput: {
    marginTop: 16,
    gap: 12,
  },
  customInput: {
    borderWidth: 1.5,
    borderColor: '#0D9488',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  customInputButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  customInputButtonCancel: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  customInputButtonCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  customInputButtonSubmit: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#0D9488',
    alignItems: 'center',
  },
  customInputButtonSubmitText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Image preview modal styles
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  previewImage: {
    width: '90%',
    height: '80%',
  },
});
