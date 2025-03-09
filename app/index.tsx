import * as React from 'react'
import { Image, Text, View, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from '../data.json'
import { generateRandomLetter, shuffleArray } from '@/utils'
import { SuggestedLetters } from '@/components/SuggestedLetters'

type Guess = {
  text: string
  fromIndex: number
}

export default function HomeScreen() {
  const [guess, setGuess] = React.useState<(Guess | null)[]>([...data[0].word].map(() => null))

  const [status, setStatus] = React.useState<'success' | 'error' | 'idle'>('idle')

  const MAX_SUGGESTED_LETTERS = 12
  const letters = React.useRef(
    shuffleArray([
      ...data[0].word,
      ...new Array(MAX_SUGGESTED_LETTERS - data[0].word.length).fill(null).map(generateRandomLetter),
    ]),
  )
  const [usedLetters, setUsedLetters] = React.useState(letters.current.map(() => false))

  const selectLetter = (index: number) => {
    const newUsedLetters = [...usedLetters]
    newUsedLetters[index] = true
    setUsedLetters(newUsedLetters)

    const letter = letters.current[index]
    const newGuess = [...guess]

    const newGuessLetterIndex = newGuess.findIndex((letter) => letter === null)

    if (newGuessLetterIndex === -1) {
      // guess box is full but we should never reach this point
      return
    }

    newGuess[newGuessLetterIndex] = {
      text: letter,
      fromIndex: index,
    }

    setGuess(newGuess)

    if (newGuess.every((letter) => letter !== null)) {
      // user is making a guess, show the feedback.
      const matchesWord = newGuess.join('') === data[0].word
      if (matchesWord) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    }
  }

  const handleClear = () => {
    setGuess(guess.map(() => null))
    setUsedLetters(letters.current.map(() => false))
    setStatus('idle')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.images}>
        {data[0].images.map((url) => (
          <Image key={url} src={url} style={styles.image} />
        ))}
      </View>

      <View style={styles.guess}>
        {guess.map((letter, index) => {
          const unPickLetter = () => {
            if (!letter) {
              return
            }
            setStatus('idle')

            const newGuess = [...guess]
            newGuess[index] = null
            setGuess(newGuess)

            const newUsedLetters = [...usedLetters]
            newUsedLetters[letter.fromIndex] = false
            setUsedLetters(newUsedLetters)
          }

          return (
            <Pressable
              key={index}
              disabled={!letter}
              style={[
                styles.guessLetterBox,
                status === 'success' && styles.guessLetterBoxSuccess,
                status === 'error' && styles.guessLetterBoxError,
              ]}
              onPress={unPickLetter}
            >
              <Text style={styles.guessLetterBoxText}>{letter?.text}</Text>
            </Pressable>
          )
        })}
      </View>

      <View
        style={{
          marginTop: 32,
        }}
      />

      <SuggestedLetters
        letters={letters.current}
        usedLetters={usedLetters}
        canSelectLetter={guess.some((letter) => letter === null)}
        onSelectLetter={selectLetter}
        onClear={handleClear}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31363F',
    padding: 16,
  },
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

  guess: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  guessLetterBox: {
    backgroundColor: '#131010',
    minWidth: 48,
    minHeight: 48,
    maxHeight: 48,
    maxWidth: 48,
    borderBlockColor: '#9AA6B2',
    boxShadow: '0 0 0 1px #9AA6B2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guessLetterBoxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textTransform: 'uppercase',
  },

  guessLetterBoxError: {
    backgroundColor: '#E52020',
    borderBlockColor: '#B82132',
    boxShadow: '0 0 0 1px #B82132',
  },

  guessLetterBoxSuccess: {
    backgroundColor: '#255F38',
    borderBlockColor: '#6A9C89',
    boxShadow: '0 0 0 1px #6A9C89',
  },

  separators: {},
})
