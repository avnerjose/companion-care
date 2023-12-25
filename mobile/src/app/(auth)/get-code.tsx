import { IconButton } from "@/components/IconButton";
import Colors from "@/constants/Colors";
import { api } from "@/services/api";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";

export default function GetCodeScreen() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputStyle = isInputFocused
    ? styles.textInputFocused
    : styles.textInput;
  const [isConfirmEmailModalVisible, setIsConfirmEmailModalVisible] = useState<
    boolean
  >(false);
  const router = useRouter();

  const handleNextStepButtonClick = () => {
    if (!email.trim()) return;

    setIsConfirmEmailModalVisible(true);
  };

  const handleConfirmEmail = async () => {
    try {
      setIsLoading(true);
      setIsConfirmEmailModalVisible(false);

      await api.post("/auth/send-code", {
        email,
      });

      setIsLoading(false);

      router.push({
        pathname: "/(auth)/verify-code",
        params: {
          email,
        },
      });
    } catch (e) {
      setIsLoading(false);

      Toast.show({
        type: "error",
        text1: "Erro na autenticação",
        text2: "Ocorreu um erro ao enviar o código de acesso.",
        topOffset: 70,
      });

      console.log(JSON.stringify(e, null, 2));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.icon}
        source={require("../../../assets/images/companion_care_icon.png")}
      />
      <Image
        style={styles.logo}
        source={require("../../../assets/images/companion_care_logo.png")}
      />
      <Text style={styles.title}>Digite seu e-mail</Text>
      <Text style={styles.subtitle}>
        Insira seu e-mail para receber o código de acesso
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={inputStyle}
        placeholder="Email"
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      <IconButton
        iconName="arrow-forward"
        onPress={handleNextStepButtonClick}
        styleSheet={styles.iconButton}
        isLoading={isLoading}
      />
      <Modal
        visible={isConfirmEmailModalVisible}
        onRequestClose={() => setIsConfirmEmailModalVisible(false)}
        transparent
        style={styles.overlay}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Este email está correto?</Text>
            <Text style={styles.modalEmail}>{email}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setIsConfirmEmailModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmEmail}>
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    color: Colors.light.secondary[700],
    fontWeight: "bold",
  },
  subtitle: {
    maxWidth: "65%",
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  logo: {
    height: undefined,
    width: 200,
    aspectRatio: 13 / 1,
    marginBottom: 32,
  },
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  textInputFocused: {
    width: "100%",
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 2,
    borderColor: Colors.light.primary[500],
  },
  iconButton: {
    position: "absolute",
    bottom: 16,
    right: 32,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 8,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
  },
  modalEmail: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
    color: Colors.light.secondary[700],
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 16,
  },
  modalButtonText: {
    fontSize: 16,
    color: Colors.light.primary[500],
    fontWeight: "bold",
  },
});
