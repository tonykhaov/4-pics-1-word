import * as React from 'react'
import { Image, Text, View, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from '../data.json'
import { generateRandomLetter, shuffleArray } from '@/utils'

export default function HomeScreen() {
  const [guess, setGuess] = React.useState<(string | null)[]>(
    [...data[0].word].map((letter, i) => (i % 3 === 0 ? letter : null)),
  )

  const MAX_X = 12
  const letters = React.useRef<string[]>(
    shuffleArray([...data[0].word, ...new Array(MAX_X - data[0].word.length).fill(null).map(generateRandomLetter)]),
  )

  const [usedLetters, setUsedLetters] = React.useState(letters.current.map(() => false))

  const selectLetter = (index: number) => {
    setUsedLetters((prevUsedLetters) => {
      const newUsedLetters = [...prevUsedLetters]
      newUsedLetters[index] = true
      return newUsedLetters
    })

    const letter = letters.current[index]
  }

  const handleClear = () => {
    setGuess(guess.map(() => null))
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.images}>
        {data[0].images.map((url) => (
          <Image key={url} src={url} style={styles.image} />
        ))}
      </View>

      <View style={styles.guess}>
        {guess.map((letter, index) => (
          <View key={index} style={styles.guessLetterBox}>
            <Text style={styles.guessLetterBoxText}>{letter}</Text>
          </View>
        ))}
      </View>

      <View
        style={{
          marginTop: 48,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {/* First row */}
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
            }}
          >
            {letters.current.slice(0, 6).map((letter, index) => {
              const isUsed = usedLetters[index]

              return (
                <Pressable
                  onPress={() => selectLetter(index)}
                  disabled={isUsed}
                  style={[styles.letterBtn, isUsed ? styles.letterBtnDisabled : null]}
                  key={letter + index}
                >
                  <Text style={styles.letterBtnText}>{letter}</Text>
                </Pressable>
              )
            })}
          </View>

          {/* Second row */}
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
            }}
          >
            {letters.current.slice(6).map((letter, index) => {
              const correctIndex = index + 6
              const isUsed = usedLetters[correctIndex]

              return (
                <Pressable
                  onPress={() => selectLetter(correctIndex)}
                  disabled={isUsed}
                  style={[styles.letterBtn, isUsed ? styles.letterBtnDisabled : null]}
                  key={letter + correctIndex}
                >
                  <Text style={styles.letterBtnText}>{letter}</Text>
                </Pressable>
              )
            })}
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
          }}
        >
          <Pressable
            style={{
              padding: 16,
            }}
            onPress={handleClear}
          >
            <Text>Clear</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  image: {
    width: '48%', // each image should be 50% width ideally but there is a gap and other spacings
    height: 150,
  },

  guess: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  guessLetterBox: {
    backgroundColor: '#31363F',
    minWidth: 48,
    minHeight: 48,
    maxHeight: 48,
    maxWidth: 48,
    borderBlockColor: '#76ABAE',
    boxShadow: '0 0 0 1px #76ABAE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guessLetterBoxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textTransform: 'uppercase',
  },

  letterBtn: {
    minWidth: 48,
    minHeight: 48,
    maxWidth: 48,
    maxHeight: 48,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  letterBtnText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  letterBtnDisabled: {
    opacity: 0.1,
  },
})
