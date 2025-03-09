import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from '../data.json'
import { generateRandomLetter, shuffleArray } from '@/utils'
import { SuggestedLetters } from '@/components/SuggestedLetters'
import { ImagesGallery } from '@/components/ImagesGallery'
import { GuessingWord } from '@/components/GuessingWord'

export type Guess = {
  text: string
  fromIndex: number
}

export type Status = 'success' | 'error' | 'idle'

export default function HomeScreen() {
  const game = React.useRef(data[0])

  const [guess, setGuess] = React.useState<(Guess | null)[]>([...game.current.word].map(() => null))

  const [status, setStatus] = React.useState<Status>('idle')

  const MAX_SUGGESTED_LETTERS = 12
  const letters = React.useRef(
    shuffleArray([
      ...game.current.word,
      ...new Array(MAX_SUGGESTED_LETTERS - game.current.word.length).fill(null).map(generateRandomLetter),
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
      const matchesWord = newGuess.join('') === game.current.word
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

  const unPickLetterFromGuess = (letter: Guess, index: number) => {
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
    <SafeAreaView style={styles.container}>
      <ImagesGallery images={game.current.images} />

      <View style={styles.separator} />

      <GuessingWord guess={guess} status={status} unPickLetter={unPickLetterFromGuess} />

      <View style={styles.separator} />

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

  separator: {
    marginTop: 32,
  },
})
