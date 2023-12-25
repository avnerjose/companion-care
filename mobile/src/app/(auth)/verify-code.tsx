import { IconButton } from "@/components/IconButton";
import { router, useLocalSearchParams } from "expo-router";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "@/contexts/auth.context";
import { Image } from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

interface CodeStateProps {
  numbers: Number[];
  code: string;
}

function reducer(
  state: CodeStateProps,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "EDIT_VALUE":
      const index = action.payload.index;
      const value = action.payload.value;

      const newState = [...state.numbers];
      newState[index] = Number(value);

      return { ...state, numbers: newState };
  }

  return state;
}

export default function VerifyCode() {
  const { email } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<TextInput[] | null[]>([]);
  const [state, dispatch] = useReducer(reducer, {
    numbers: [],
    code: "",
  });
  const { signIn } = useAuth();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleVerifyCode = async () => {
    if (state.numbers.length < 6) return;

    const code = state.numbers.join("");
    try {
      setIsLoading(true);
      await signIn(email as string, code);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleInputChange = (idx: number, next = false, previous = false) => {
    let targetIndex = idx;

    if (next) {
      targetIndex = idx + 1;
    } else if (previous) {
      targetIndex = idx - 1;
    }
    const input = inputRefs.current[targetIndex];

    if (input) {
      input.focus();
    }
  };

  useEffect(() => {
    handleInputChange(0);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Ionicons style={styles.goBackButtonIcon} name="arrow-back" size={32} />
      </TouchableOpacity>
      <Image
        style={styles.icon}
        source={require("../../../assets/images/companion_care_icon.png")}
      />
      <Image
        style={styles.logo}
        source={require("../../../assets/images/companion_care_logo.png")}
      />
      <Text style={styles.title}>Verifique seu e-mail</Text>
      <Text style={styles.subtitle}>Digite o código enviado por e-mail</Text>
      <View style={styles.textInputs}>
        {[...new Array(6)].map((_, idx) => {
          const isFocused = inputRefs.current[idx]?.isFocused();

          return (
            <TextInput
              key={idx}
              style={isFocused ? styles.textInputFocused : styles.textInput}
              ref={(ref) => (inputRefs.current[idx] = ref)}
              maxLength={1}
              keyboardType="numeric"
              value={
                state.numbers[idx] ? String(state.numbers[idx]) : undefined
              }
              onFocus={() => handleInputChange(idx)}
              onChangeText={(value) => {
                dispatch({
                  type: "EDIT_VALUE",
                  payload: { index: idx, value },
                });
                if (value === "") {
                  handleInputChange(idx, false, true);
                } else {
                  handleInputChange(idx, true);
                }
              }}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key >= "0" && nativeEvent.key <= "9") {
                  if (state.numbers[idx]) {
                    handleInputChange(idx, true);
                  }
                }

                if (nativeEvent.key === "Backspace") {
                  handleInputChange(idx, false, true);
                }
              }}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleVerifyCode}>
        <Text style={styles.loginButtonText}>Fazer Login</Text>
        {isLoading ? (
          <ActivityIndicator color="white" size={24} />
        ) : (
          <Ionicons style={styles.buttonIcon} name="arrow-forward" size={24} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  title: {
    fontSize: 24,
    color: Colors.light.secondary[700],
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  buttonIcon: {
    color: "white",
  },
  logo: {
    height: undefined,
    width: 200,
    aspectRatio: 13 / 1,
    marginBottom: 32,
  },
  textInputs: {
    flexDirection: "row",
    gap: 4,
    marginTop: 16,
  },
  textInput: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
  },
  textInputFocused: {
    borderWidth: 2,
    borderColor: Colors.light.primary[500],
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
  },
  iconButton: {
    position: "absolute",
    bottom: 16,
    right: 32,
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  loginButton: {
    backgroundColor: Colors.light.primary[500],
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 32,
    flexDirection: "row",
    gap: 8,
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  goBackButton: {
    position: "absolute",
    top: 64,
    left: 32,
  },
  goBackButtonIcon: {
    color: Colors.light.primary[500],
  },
});
