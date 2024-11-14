import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

const Home = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(root)/home" />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
