import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { UsedLetter } from './UsedLetter'

type SuggestedLettersProps = {
  letters: string[]
  usedLetters: boolean[]
  onSelectLetter: (index: number) => void
  canSelectLetter: boolean
  onClear: () => void
}

export function SuggestedLetters({
  letters,
  onSelectLetter,
  usedLetters,
  canSelectLetter,
  onClear,
}: SuggestedLettersProps) {
  return (
    <View style={styles.container}>
      <View style={styles.lettersContainer}>
        <View style={styles.lettersRow}>
          {letters.slice(0, 6).map((letter, index) => {
            const isUsed = usedLetters[index]
            if (isUsed) {
              return <UsedLetter key={letter + index} />
            }

            return (
              <Pressable
                onPress={() => onSelectLetter(index)}
                style={[styles.letterBtn, !canSelectLetter ? styles.letterBtnDisabled : null]}
                key={letter + index}
                disabled={!canSelectLetter}
              >
                <Text style={styles.letterBtnText}>{letter}</Text>
              </Pressable>
            )
          })}
        </View>

        <View style={styles.rowSeparator} />

        <View style={styles.lettersRow}>
          {letters.slice(6).map((letter, index) => {
            const secondRowIndex = index + 6

            const isUsed = usedLetters[secondRowIndex]
            if (isUsed) {
              return <UsedLetter key={letter + secondRowIndex} />
            }

            return (
              <Pressable
                onPress={() => onSelectLetter(secondRowIndex)}
                style={[styles.letterBtn, !canSelectLetter ? styles.letterBtnDisabled : null]}
                key={letter + index}
                disabled={!canSelectLetter}
              >
                <Text style={styles.letterBtnText}>{letter}</Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      <Pressable style={styles.clearBtn} onPress={onClear}>
        <MaterialCommunityIcons name="eraser" size={24} color="white" />
        <Text style={styles.clearBtnText}>Clear</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  lettersContainer: {
    flex: 1,
  },
  lettersRow: {
    flexDirection: 'row',
    gap: 4,
  },

  rowSeparator: {
    marginTop: 8,
  },

  letterBtn: {
    minWidth: 48,
    minHeight: 48,
    maxWidth: 48,
    maxHeight: 48,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  letterBtnText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  letterBtnDisabled: {
    opacity: 0.2,
  },

  clearBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 4,
    backgroundColor: '#77B254',
  },
  clearBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
