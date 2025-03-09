import * as React from 'react'
import { Image, Text, View, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from '../data.json'
import { generateRandomLetter, shuffleArray } from '@/utils'
import { SuggestedLetters } from '@/components/SuggestedLetters'
import { ImagesGallery } from '@/components/ImagesGallery'

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

  const pickLetter = (index: number) => {
    const newUsedLetters = [...usedLetters]
    newUsedLetters[index] = true
    setUsedLetters(newUsedLetters)

    const letter = letters.current[index]
    const newGuess = [...guess]

    const newGuessLetterIndex = newGuess.findIndex((letter) => letter === null)

    if (newGuessLetterIndex >= 0) {
      newGuess[newGuessLetterIndex] = {
        text: letter,
        fromIndex: index,
      }
      setGuess(newGuess)
    }

    const shouldCheckGuess = newGuess.every((letter) => letter !== null)
    if (shouldCheckGuess) {
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
      <ImagesGallery images={data[0].images} />

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
        canPickLetter={guess.some((letter) => letter === null)}
        onPickLetter={pickLetter}
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
