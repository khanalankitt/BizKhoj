import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.35;
const DRAG_THRESHOLD = 100;

interface ListBusinessModalProps {
  visible: boolean;
  onClose: () => void;
  onStartNow: () => void;
}

export function ListBusinessModal({
  visible,
  onClose,
  onStartNow,
}: ListBusinessModalProps) {
  const translateY = useSharedValue(MODAL_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {
        damping: 50,
        stiffness: 400,
      });
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(MODAL_HEIGHT, { duration: 300 });
      backdropOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.value = gestureState.dy;
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DRAG_THRESHOLD) {
          translateY.value = withTiming(MODAL_HEIGHT, { duration: 300 });
          setTimeout(onClose, 300);
        } else {
          translateY.value = withSpring(0, {
            damping: 50,
            stiffness: 400,
          });
        }
      },
    })
  ).current;

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        >
          <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
        </TouchableOpacity>

        <Animated.View
          style={[styles.modalContent, modalAnimatedStyle]}
          {...panResponder.panHandlers}
        >
          {/* Drag Handle */}
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Ionicons name="business" size={48} color="#0D9488" />
              </View>

              <Text style={styles.title}>
                List Your Business for <Text style={styles.freeText}>FREE</Text>
              </Text>
              <Text style={styles.subtitle}>
                Reach <Text style={styles.highlightText}>thousands</Text> of customers by listing on BizKhoj
              </Text>

              <TouchableOpacity style={styles.startButton} onPress={onStartNow}>
                <Text style={styles.startButtonText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.benefitsContainer}>
                <View style={styles.benefit}>
                  <Ionicons name="checkmark-circle" size={18} color="#10B981" />
                  <Text style={styles.benefitText}>
                    <Text style={styles.benefitBold}>Free</Text> forever
                  </Text>
                </View>
                <View style={styles.benefit}>
                  <Ionicons name="flash" size={18} color="#F59E0B" />
                  <Text style={styles.benefitText}>
                    Setup in <Text style={styles.benefitBold}>2 mins</Text>
                  </Text>
                </View>
                <View style={styles.benefit}>
                  <Ionicons name="eye" size={18} color="#3B82F6" />
                  <Text style={styles.benefitText}>
                    Instant <Text style={styles.benefitBold}>visibility</Text>
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: MODAL_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  freeText: {
    color: '#10B981',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  highlightText: {
    fontWeight: '700',
    color: '#0D9488',
  },
  startButton: {
    backgroundColor: '#0D9488',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: '#0D9488',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  benefitText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
  benefitBold: {
    fontWeight: '700',
    color: '#111827',
  },
});
