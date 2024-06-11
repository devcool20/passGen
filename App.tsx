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
  const [uppercase, setUpperCase] = useState(false)
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
         <View style={styles.imputWrapper}></View>
         <View style={styles.imputWrapper}></View>
         <View style={styles.imputWrapper}></View>
         <View style={styles.imputWrapper}></View>

         <View style={styles.formActions}>
          <TouchableOpacity><Text>Generate Password</Text></TouchableOpacity>
          <TouchableOpacity><Text>Reset</Text></TouchableOpacity>         
         </View>
         </>
       )}
     </Formik>
        </View>
      </SafeAreaView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({})