import React, { useEffect, memo, useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AppContext from "AppContext";

type Props = {
  navigation: import("react-navigation").NavigationScreenProp<
    import("react-navigation").NavigationState,
    import("react-navigation").NavigationParams
  >;
};

function AppLoading({ navigation: { navigate } }: Props) {
  const { currentAuthenticatedUser, setCurrentAuthenticatedUser } = useContext(
    AppContext
  );
  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    if (currentAuthenticatedUser) {
      return navigate("App");
    }

    try {
      const { Auth } = await import("aws-amplify");

      const user = await Auth.currentAuthenticatedUser();

      if (user) {
        await setCurrentAuthenticatedUser(user);

        navigate("App");
      } else {
        navigate("Auth");
      }
    } catch {
      navigate("Auth");
    }
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator animating size="small" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white"
  }
});

export default memo(AppLoading);
