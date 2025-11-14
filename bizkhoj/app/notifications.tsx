import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'promo';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'Someone saved your review',
    message: 'Your review of Mountain View Cafe was marked as helpful by 3 people.',
    time: '45m',
    read: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Review published',
    message: 'Your review of Royal Bakery is now live.',
    time: '2h',
    read: false,
  },
  {
    id: '3',
    type: 'promo',
    title: 'Weekend special',
    message: 'The Coffee Hub: Buy 2 get 1 free on all beverages. Valid until Sunday.',
    time: '4h',
    read: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'Price update',
    message: 'Green Valley Restaurant has updated their menu prices.',
    time: '1d',
    read: true,
  },
  {
    id: '5',
    type: 'warning',
    title: 'Temporary closure',
    message: 'Sunrise Gym will be closed for renovation from Dec 1-5.',
    time: '1d',
    read: true,
  },
  {
    id: '6',
    type: 'info',
    title: 'New photos added',
    message: 'Urban Fitness Center added 8 new photos to their gallery.',
    time: '2d',
    read: true,
  },
  {
    id: '7',
    type: 'promo',
    title: 'Flash sale',
    message: 'Books & Beyond: 40% off on all bestsellers. Today only.',
    time: '3d',
    read: true,
  },
  {
    id: '8',
    type: 'info',
    title: 'Business responded',
    message: 'Pearl Dental Clinic replied to your review.',
    time: '3d',
    read: true,
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIconName = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'warning':
        return 'alert-circle';
      case 'promo':
        return 'pricetag';
      case 'info':
      default:
        return 'information-circle';
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'promo':
        return '#8b5cf6';
      case 'info':
      default:
        return '#14b8a6';
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '#d1fae5';
      case 'warning':
        return '#fef3c7';
      case 'promo':
        return '#ede9fe';
      case 'info':
      default:
        return '#f0fdfa';
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: getBackgroundColor(item.type) }]}>
        <Ionicons name={getIconName(item.type) as any} size={20} color={getIconColor(item.type)} />
      </View>
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.markReadButton}
            onPress={markAllAsRead}
          >
            <Ionicons name="checkmark-done" size={24} color="#14b8a6" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>No notifications yet</Text>
          <Text style={styles.emptySubtitle}>We'll notify you when something new happens</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  markReadButton: {
    padding: 8,
  },
  listContent: {
    padding: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: '#14b8a6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#14b8a6',
    marginLeft: 6,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 11,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
