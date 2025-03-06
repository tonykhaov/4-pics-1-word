import { Image, Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from '../data.json'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.images}>
        {data[0].images.map((url) => (
          <Image key={url} src={url} style={styles.image} />
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  images: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  image: {
    width: '48%', // each image should be 50% width ideally but there is a gap and other spacings
    height: 150,
  },
})
