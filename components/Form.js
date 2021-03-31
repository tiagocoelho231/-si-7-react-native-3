import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const data = {
  courses: [
    'Ciências Contábeis',
    'Medicina Veterinária',
    'Sistemas de Informação'
  ],
  genders: ['Masculino', 'Feminino', 'Outro'],
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
  const [formValues, setFormValues] = useState({
    name: '',
    course: 0,
    semester: 0,
    period: 0,
    age: '',
    gender: 0,
    income: 0,
    scholarship: false
  });

  const handleValueChange = useCallback(
    field => value => {
      setFormValues(state => ({ ...state, [field]: value }));
    },
    []
  );

  const handlePickerChange = useCallback(picker => handleValueChange(picker), [
    handleValueChange
  ]);

  const isValid = useCallback(() => {
    const fields = [
      'name',
      'course',
      'semester',
      'period',
      'age',
      'gender',
      'income',
      'scholarship'
    ];

    return fields.every(
      field =>
        formValues[field] !== undefined &&
        formValues[field] !== null &&
        formValues[field] !== ''
    );
  }, [formValues]);

  const onSubmit = useCallback(() => {
    Alert.alert('Dados enviados com sucesso.');
  }, []);

  return (
    <View style={styles.form}>
      <Text style={styles.text}>Selecione os parâmetros:</Text>

      <TextInput
        onChangeText={handleValueChange('name')}
        placeholder="Digite seu nome"
        style={styles.input}
        value={formValues.name}
      />

      <View style={styles.picker}>
        <Picker
          selectedValue={formValues.course}
          onValueChange={handlePickerChange('course')}
        >
          {getPickerOptions('courses')}
        </Picker>
      </View>

      <View style={styles.picker}>
        <Picker
          selectedValue={formValues.period}
          onValueChange={handlePickerChange('period')}
        >
          {getPickerOptions('periods')}
        </Picker>
      </View>

      <View style={styles.picker}>
        <Picker
          selectedValue={formValues.semester}
          onValueChange={handlePickerChange('semester')}
        >
          {getPickerOptions('semesters')}
        </Picker>
      </View>

      <TextInput
        onChangeText={handleValueChange('age')}
        placeholder="Digite sua idade"
        style={styles.input}
        keyboardType="number-pad"
        value={formValues.age}
      />

      <View style={styles.picker}>
        <Picker
          selectedValue={formValues.gender}
          onValueChange={handlePickerChange('gender')}
        >
          {getPickerOptions('genders')}
        </Picker>
      </View>

      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderLabel}>Renda:</Text>
        <Slider
          minimumValue={0}
          maximumValue={10000}
          onSlidingComplete={handleValueChange('income')}
          step={100}
          style={styles.slider}
          value={formValues.income}
        />
        <Text>{formValues.income}</Text>
      </View>

      <View style={styles.switchWrapper}>
        <Text style={styles.switchLabel}>Já ganhou bolsa?</Text>
        <Switch
          onValueChange={handleValueChange('scholarship')}
          value={formValues.scholarship}
        />
      </View>

      <View
        style={
          isValid()
            ? styles.button
            : { ...styles.button, ...styles.buttonDisabled }
        }
      >
        <TouchableOpacity disabled={!isValid()} onPress={onSubmit}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.insertedInfo}>
        <Text style={styles.insertedInfoText}>Informações inseridas:</Text>

        <View style={styles.field}>
          <Text style={styles.fieldKey}>Nome:</Text>
          <Text style={styles.fieldValue}>{formValues.name}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldKey}>Curso:</Text>
          <Text style={styles.fieldValue}>
            {getPickerValue('courses', formValues.course)}
          </Text>
        </View>

        <View style={styles.field}>
          <View style={styles.halfField}>
            <Text style={styles.fieldKey}>Período:</Text>
            <Text style={styles.fieldValue}>
              {getPickerValue('semesters', formValues.semester)}
            </Text>
          </View>

          <View style={styles.halfField}>
            <Text style={styles.fieldKey}>Turno:</Text>
            <Text style={styles.fieldValue}>
              {getPickerValue('periods', formValues.period)}
            </Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldKey}>Idade:</Text>
          <Text style={styles.fieldValue}>{formValues.age}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldKey}>Sexo:</Text>
          <Text style={styles.fieldValue}>
            {getPickerValue('genders', formValues.gender)}
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldKey}>Renda:</Text>
          <Text style={styles.fieldValue}>{formValues.income}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldKey}>Já ganhou bolsa?</Text>
          <Text style={styles.fieldValue}>
            {formValues.scholarship ? 'Sim' : 'Não'}
          </Text>
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
    marginBottom: 10,
    paddingHorizontal: 20
  },
  picker: {
    borderColor: '#000000',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10
  },
  sliderWrapper: { flexDirection: 'row', marginBottom: 10 },
  sliderLabel: { fontSize: 16 },
  slider: { flex: 1 },
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  switchLabel: {
    fontSize: 16
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#3d8af7',
    borderRadius: 10
  },
  buttonDisabled: {
    opacity: 0.3
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10
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
