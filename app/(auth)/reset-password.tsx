import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputTextField from "@/components/InputTextField";
import { icons } from "@/constants";

const ResetPassword = () => {
  const { signIn, setActive } = useSignIn()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [code, setCode] = useState("")
  const [passwordResetForm, setPasswordResetForm] = useState({
    email: "",
    secondFactor: false,
    error: "",
    codeGenerated: false
  })

  const sendPasswordResetCode = async () => {
    if (!passwordResetForm.email) {
      setPasswordResetForm({
        ...passwordResetForm,
        error: "Please enter email"
      })
      return;
    }
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: passwordResetForm.email,
      })
      .then((_) => {
        setPasswordResetForm({
          ...passwordResetForm,
          codeGenerated: true
        })
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setPasswordResetForm({
          ...passwordResetForm,
          error: "Invalid email"
        })
      })
  }

  const resetPassword = async () => {
    if (password != confirmPassword) {
      setPasswordResetForm({
        ...passwordResetForm,
        error: "Passwords do not match"
      })
      return
    }
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        if (result.status === 'needs_second_factor') {
          setPasswordResetForm({
            ...passwordResetForm,
            secondFactor: true
          })
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId })
          router.replace("/(root)/(tabs)/home");
        } else {
          console.log(result)
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setPasswordResetForm({
          ...passwordResetForm,
          error: err.errors[0].longMessage
        })
      })
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Text className="text-2xl text-black font-semibold absolute bottom-5 left-5">
              Reset Password
            </Text>
          </View>

          <View className="p-5">
            {!passwordResetForm.codeGenerated ?
              <View>
                <InputTextField
                  label="Email"
                  placeholder="Enter email"
                  textContentType="emailAddress"
                  value={passwordResetForm.email}
                  onChangeText={(email) => setPasswordResetForm({ ...passwordResetForm, email: email })}
                  icon={icons.email}
                />
                
                <CustomButton
                  title="Send code"
                  onPress={sendPasswordResetCode}
                  className="mt-6"
                />
              </View>
              :
              <View>
                <InputTextField
                  label="Password"
                  placeholder="Enter password"
                  secureTextEntry={true}
                  textContentType="password"
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  icon={icons.password}
                />

                <InputTextField
                  label="Confirm Password"
                  placeholder="Enter password again"
                  secureTextEntry={true}
                  textContentType="password"
                  value={confirmPassword}
                  onChangeText={(password) => setConfirmPassword(password)}
                  icon={icons.password}
                />

                <InputTextField
                  label="Reset password code"
                  placeholder="Enter code"
                  value={code}
                  onChangeText={(code) => setCode(code)}
                  icon={icons.code}
                />

                <CustomButton
                  title="Reset password"
                  onPress={resetPassword}
                  className="mt-7"
                />
              </View>
            }

            {passwordResetForm.error && 
              <Text className="p-3 mt-5 text-center text-base text-red-500">{passwordResetForm.error}</Text>
            }

            <Link
              href="/sign-in"
              className="text-base text-center mt-8"
            >
              <Text className="text-black font-semibold">Back to Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ResetPassword;