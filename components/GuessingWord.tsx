import type { Guess, Status } from '@/app'
import { View, Pressable, StyleSheet, Text } from 'react-native'

type GuessingWordProps = {
  guess: (Guess | null)[]
  status: Status
  unPickLetter: (letter: Guess, index: number) => void
}

export function GuessingWord({ guess, status, unPickLetter }: GuessingWordProps) {
  return (
    <View style={styles.guess}>
      {guess.map((letter, index) => {
        return (
          <Pressable
            key={index}
            disabled={!letter}
            style={[
              styles.guessLetterBox,
              status === 'success' && styles.guessLetterBoxSuccess,
              status === 'error' && styles.guessLetterBoxError,
            ]}
            onPress={() => {
              if (!letter) {
                return
              }
              unPickLetter(letter, index)
            }}
          >
            <Text style={styles.guessLetterBoxText}>{letter?.text}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  guess: {
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
})
