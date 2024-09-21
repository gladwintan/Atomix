import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomButton from '@/components/CustomButton'

export default function Home() {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
      <CustomButton 
        title='Sign Out'
        onPress={() => signOut({ redirectUrl: '/(root)/(tabs)/home' })}
      />
    </SafeAreaView>
  )
}