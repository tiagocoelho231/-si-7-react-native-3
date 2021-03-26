import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const data = {
  courses: [
    'Ciências Contábeis',
    'Medicina Veterinária',
    'Sistemas de Informação'
  ],
  periods: ['Matutino', 'Vespertino', 'Noturno'],
  semesters: [
    '1º Período',
    '2º Período',
    '3º Período',
    '4º Período',
    '5º Período',
    '6º Período',
    '7º Período',
    '8º Período',
    '9º Período',
    '10º Período'
  ]
};

function getPickerOptions(picker) {
  return data[picker].map((label, index) => (
    <Picker.Item label={label} value={index} key={index} />
  ));
}

function getPickerValue(picker, value) {
  return data[picker][value];
}

export default function Form() {
  const [inputValue, setInputValue] = useState('');
  const [pickerValues, setPickerValues] = useState({});

  const handleTextChange = useCallback(value => {
    setInputValue(value);
  }, []);

  const handlePickerChange = useCallback(
    picker => value => {
      setPickerValues(state => ({ ...state, [picker]: value }));
    },
    []
  );

  const getPickerProps = useCallback(
    picker => ({
      selectedValue: pickerValues[picker],
      onValueChange: handlePickerChange(picker)
    }),
    [pickerValues, handlePickerChange]
  );

  return (
    <View style={styles.form}>
      <Text style={styles.text}>Selecione os parâmetros:</Text>
      <TextInput
        onChangeText={handleTextChange}
        placeholder="Digite seu nome"
        style={styles.input}
        value={inputValue}
      />
      <View style={styles.picker}>
        <Picker {...getPickerProps('course')}>
          {getPickerOptions('courses')}
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker {...getPickerProps('period')}>
          {getPickerOptions('periods')}
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker {...getPickerProps('semester')}>
          {getPickerOptions('semesters')}
        </Picker>
      </View>
      <View style={styles.insertedInfo}>
        <Text style={styles.insertedInfoText}>Informações inseridas:</Text>
        <View style={styles.field}>
          <Text style={styles.fieldKey}>Nome:</Text>
          <Text style={styles.fieldValue}>{inputValue}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldKey}>Curso:</Text>
          <Text style={styles.fieldValue}>
            {getPickerValue('courses', pickerValues.course)}
          </Text>
        </View>
        <View style={styles.field}>
          <View style={styles.halfField}>
            <Text style={styles.fieldKey}>Período:</Text>
            <Text style={styles.fieldValue}>
              {getPickerValue('semesters', pickerValues.semester)}
            </Text>
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldKey}>Turno:</Text>
            <Text style={styles.fieldValue}>
              {getPickerValue('periods', pickerValues.period)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20
  },
  text: {
    marginBottom: 20
  },
  input: {
    borderColor: '#000000',
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 16,
    paddingHorizontal: 20
  },
  picker: {
    borderColor: '#000000',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 10
  },
  insertedInfo: {
    marginTop: 20,
    width: '100%'
  },
  insertedInfoText: {
    fontSize: 25
  },
  field: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%'
  },
  halfField: {
    flex: 1,
    flexDirection: 'row'
  },
  fieldKey: {
    fontSize: 16,
    fontWeight: '700'
  },
  fieldValue: {
    fontSize: 16,
    marginLeft: 20
  }
});
