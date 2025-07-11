import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/notesSlice';

export default function AddNoteScreen() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleAdd = () => {
    if (subject && topic && date) {
      dispatch(
        addNote({
          subject,
          topic,
          date: date.toLocaleDateString(), 
        })
      );
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Add New Note</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Topic"
        value={topic}
        onChangeText={setTopic}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>📅 {date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowPicker(false);
            setDate(currentDate);
          }}
        />
      )}

      <TouchableOpacity onPress={handleAdd} style={styles.saveButton}>
        <Text style={styles.saveText}>💾 Save Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 12,
    fontSize: 16,
  },
  dateButton: {
    padding: 14,
    backgroundColor: '#e8ecf0',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#444',
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
