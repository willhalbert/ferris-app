import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../context/authContext";
import { getAuth } from "firebase/auth";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { login, resetPassword } = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    if (user) {
      navigation.navigate("Library");
    }
  }, []);

  async function handleReset() {
    try {
      setError("");
      setMessage("");
      setLoading(true);
      const response = await resetPassword(email);
      if (response !== "success") {
        setError(response);
      } else {
        setMessage("Check your email for further instructions.");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to reset password.");
    }
    setLoading(false);
  }

  async function handleLogin() {
    try {
      setError("");
      setLoading(true);
      const response = await login(email, password);
      if (response !== "success") {
        setError(response);
      } else {
        setSuccess("You're logged in!");
        navigation.navigate("Library");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to log in.");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}
        {message ? <Text style={styles.successText}>{message}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <Button title="Log In" onPress={handleLogin} disabled={loading} />

        <TouchableOpacity style={styles.linkContainer} onPress={handleReset}>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text>
            Need an account? <Text style={styles.link}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  linkContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20, // optional: add some horizontal padding if needed
  },
  link: {
    color: "#007BFF",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
});

export default SignInScreen;
