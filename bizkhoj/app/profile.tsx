import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const menuItems = [
    {
      id: "1",
      icon: "person-outline",
      title: "Edit Profile",
      subtitle: "Update your information",
    },
    {
      id: "2",
      icon: "heart-outline",
      title: "Favorites",
      subtitle: "Your saved places",
    },
    {
      id: "3",
      icon: "time-outline",
      title: "Recent Searches",
      subtitle: "View your history",
    },
    {
      id: "4",
      icon: "location-outline",
      title: "Saved Locations",
      subtitle: "Manage your addresses",
    },
    {
      id: "5",
      icon: "settings-outline",
      title: "Settings",
      subtitle: "App preferences",
    },
    {
      id: "6",
      icon: "help-circle-outline",
      title: "Help & Support",
      subtitle: "Get assistance",
    },
    {
      id: "7",
      icon: "information-circle-outline",
      title: "About",
      subtitle: "App information",
    },
  ];

  const stats = [
    { label: "Reviews", value: "24" },
    { label: "Favorites", value: "12" },
    { label: "Searches", value: "48" },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://ui-avatars.com/api/?name=John+Doe&size=200&background=14b8a6&color=fff",
                }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>johndoe@example.com</Text>
              <View style={styles.badgeRow}>
                <Text style={styles.badgePrimary}>Verified Business</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account & Activity</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItemCard}
              activeOpacity={0.85}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon as any} size={20} color="#0D9488" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.menuChevron}>
                <Ionicons name="chevron-forward" size={18} color="#CBD5F5" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push("/login")}
        >
          <Ionicons name="log-out-outline" size={18} color="#FFFFFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  safeArea: {
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: 0.3,
  },
  placeholder: {
    width: 40,
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: "#0D9488",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  profileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
    borderWidth: 3,
    borderColor: "#ECFDF5",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: -6,
    right: -6,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#0D9488",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#0D9488",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
    fontWeight: "500",
  },
  profileDetails: {
    flex: 1,
    marginLeft: 16,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  badgePrimary: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0f766e",
    backgroundColor: "#ccfbf1",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden",
  },
  statsContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#f0fdfa",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ccfbf1",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0D9488",
    marginBottom: 3,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#475569",
    marginHorizontal: 18,
    marginBottom: 10,
    marginTop: 8,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  menuContainer: {
    paddingBottom: 8,
    marginBottom: 12,
  },
  menuItemCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#0D9488",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f0fdfa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 3,
    letterSpacing: 0.2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  menuChevron: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0fdfa",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 16,
    marginHorizontal: 18,
    marginTop: 8,
    borderRadius: 14,
    gap: 10,
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  bottomSpacing: {
    height: 40,
  },
});
