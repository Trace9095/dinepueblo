import { StatusBar } from 'expo-status-bar'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const COLORS = {
  bg: '#0D1117',
  card: '#161B22',
  border: '#30363D',
  gold: '#D4A853',
  text: '#E6EDF3',
  muted: '#8B949E',
}

const CATEGORIES = [
  { label: 'Slopper', icon: 'restaurant-outline' as const },
  { label: 'Mexican', icon: 'leaf-outline' as const },
  { label: 'BBQ', icon: 'flame-outline' as const },
  { label: 'Breweries', icon: 'beer-outline' as const },
  { label: 'Breakfast', icon: 'sunny-outline' as const },
  { label: 'Italian', icon: 'pizza-outline' as const },
]

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>DINE PUEBLO</Text>
            <Text style={styles.brandTagline}>Discover Pueblo, CO</Text>
          </View>
          <Ionicons name="search-outline" size={22} color={COLORS.gold} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Pueblo's Best Dining</Text>
          <Text style={styles.heroSub}>
            From the famous Pueblo Slopper to craft breweries and authentic Mexican food — explore it all.
          </Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore by Cuisine</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity key={cat.label} style={styles.pill}>
                <Ionicons name={cat.icon} size={14} color={COLORS.gold} />
                <Text style={styles.pillText}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* CTA */}
        <View style={styles.cta}>
          <Ionicons name="storefront-outline" size={28} color={COLORS.gold} style={{ marginBottom: 8 }} />
          <Text style={styles.ctaTitle}>Own a Restaurant?</Text>
          <Text style={styles.ctaSub}>Claim your listing and reach thousands of hungry Pueblo diners.</Text>
          <TouchableOpacity style={styles.ctaBtn}>
            <Text style={styles.ctaBtnText}>Claim Your Listing</Text>
          </TouchableOpacity>
        </View>

        {/* Footer note */}
        <Text style={styles.footer}>dinepueblo.com — Pueblo, CO</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  brandName: { fontSize: 16, fontWeight: '800', color: COLORS.gold, letterSpacing: 2 },
  brandTagline: { fontSize: 11, color: COLORS.muted, marginTop: 1 },
  hero: {
    margin: 20,
    padding: 24,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroTitle: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  heroSub: { fontSize: 14, color: COLORS.muted, lineHeight: 20, marginBottom: 16 },
  heroBtn: {
    backgroundColor: COLORS.gold,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  heroBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.bg },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  pillScroll: { flexDirection: 'row' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    minHeight: 44,
  },
  pillText: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  cta: {
    margin: 20,
    padding: 24,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4A85340',
    alignItems: 'center',
  },
  ctaTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  ctaSub: { fontSize: 13, color: COLORS.muted, textAlign: 'center', marginBottom: 16, lineHeight: 18 },
  ctaBtn: {
    borderWidth: 1,
    borderColor: COLORS.gold,
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  ctaBtnText: { fontSize: 14, fontWeight: '600', color: COLORS.gold },
  footer: { textAlign: 'center', color: COLORS.muted, fontSize: 11, paddingVertical: 24 },
})
