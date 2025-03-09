import { Image, StyleSheet, View } from 'react-native'

type ImagesGalleryProps = {
  images: string[]
}
export function ImagesGallery({ images }: ImagesGalleryProps) {
  return (
    <View style={styles.images}>
      {images.map((url) => (
        <Image key={url} src={url} style={styles.image} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  image: {
    width: '48%', // each image should be 50% width ideally but there is a gap and other spacings
    height: 170,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: '#BFBBA9',
  },
})
