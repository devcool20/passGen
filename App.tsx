/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { Formik } from 'formik';

import * as Yup from 'yup'


const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Should be minimum of 4 characters')
  .max(16, 'Should be max of 16 characters')
  .required('Length is required')
})

export default function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  
  
  const generatePasswordString = (passwordLength: number) => {
    let characterlist = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterlist += upperCaseChars
    }
    if (lowerCase) {
      characterlist += lowerCaseChars
    }
    if (numbers) {
      characterlist += digitChars
    }
    if (symbols) {
      characterlist += specialChars
    }

    const passwordResult = createPassword(characterlist, 
      passwordLength )
      
      setPassword(passwordResult)
      setIsPassGenerated(true)
  }

  

  const createPassword = (characters: string,
     passwordLength: number) => {
    let result = ''

    for(let i=0; i < passwordLength; i++){
      const characterIndex = Math.floor(Math.random() * characters.length)
     result += characters.charAt(characterIndex)
    }
    return result
  }

  const resetPasswordState = () => {
   setPassword('')
   setIsPassGenerated(false)
   setLowerCase(true)
   setNumbers(false)
   setSymbols(false)
   setUpperCase(false)


  }
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={ values => {
        console.log(values);
        generatePasswordString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         isValid,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.imputWrapper}>
          <View style={styles.imputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && 
            (<Text style={styles.errorText}>
              {errors.passwordLength}
            </Text>
          )}
          </View>
          <TextInput
            style={styles.imputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 8"
            keyboardType='numeric'
            />
         </View>
         <View style={styles.imputWrapper}>
          <Text style={styles.heading}>Include Lowercase</Text>
          <BouncyCheckbox
          disbaledBuiltInState
          isChecked={lowerCase}
          onPress={() => setLowerCase(!lowerCase)}
          fillColor='#29ab87'
          />
         </View>
         <View style={styles.imputWrapper}>
         <Text style={styles.heading}>Include Uppercase</Text>
          <BouncyCheckbox
          disbaledBuiltInState
          isChecked={upperCase}
          onPress={() => setUpperCase(!upperCase)}
          fillColor='#e3ba8f'
          />
         </View>
         <View style={styles.imputWrapper}>
         <Text style={styles.heading}>Include Numbers</Text>
          <BouncyCheckbox
          disbaledBuiltInState
          isChecked={numbers}
          onPress={() => setNumbers(!numbers)}
          fillColor='#bae4e5'
          />
         </View>
         <View style={styles.imputWrapper}>
         <Text style={styles.heading}>Include Symbols</Text>
          <BouncyCheckbox
          disbaledBuiltInState
          isChecked={symbols}
          onPress={() => setSymbols(!symbols)}
          fillColor='#825e5c'
          />
         </View>

         <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={ () => {
            handleReset();
            resetPasswordState()
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>         
         </View>
         </>
       )}
     </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitile}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>

          </View>
        ) : null}
      </SafeAreaView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa', // Light background color
  },
  formContainer: {
    backgroundColor: '#ffffff', // White background for the form container
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Darker text color
    marginBottom: 20,
  },
  imputWrapper: {
    marginBottom: 16,
  },
  imputColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Darker text color
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  imputStyle: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333', // Darker text color for input
    marginTop: 8,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  primaryBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryBtnTxt: {
    color: '#ffffff', // White text color
    fontWeight: 'bold',
  },
  secondaryBtn: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryBtnTxt: {
    color: '#ffffff', // White text color
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  cardElevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  subTitile: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Darker text color
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    marginVertical: 8,
  },
  generatedPassword: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745', // Green text color for generated password
  },
})