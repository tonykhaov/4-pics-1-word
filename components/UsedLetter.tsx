import { StyleSheet, View } from 'react-native'

export function UsedLetter() {
  return (
    <View style={styles.box}>
      <View style={styles.boxContent} />
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 48,
    height: 48,
    justifyContent: 'flex-end',
  },
  boxContent: { height: 46, backgroundColor: '#4C585B', borderRadius: 4 },
})
