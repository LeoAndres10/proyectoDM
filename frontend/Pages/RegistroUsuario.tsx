import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { registroStyles } from "../Estilo/registrostyle";

export default function RegistroUsuario() {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");

  async function registroUsuario(
    nombre: string,
    contraseña: string,
    correo: string,
    direccion: string
  ) {
    if (!nombre || !contraseña || !correo || !direccion) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!emailOk) {
      Alert.alert("Correo inválido", "Ingresa un correo válido.");
      return;
    }

    try {
      const usuario = { nombre, contraseña, correo, direccion };

      const respuesta = await fetch("http://192.168.1.38:5000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const respuestaApi = await respuesta.json();

      if (respuestaApi.success) {
        Alert.alert("Registro Exitoso", "Ahora puedes continuar.");
        navigation.navigate("InicioUsuario" as never);
      } else {
        Alert.alert("Error", "Ocurrió un error, intenta de nuevo.");
      }
    } catch (e) {
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={registroStyles.container}>
          <Text style={registroStyles.title}>Crear cuenta</Text>
          <Text style={registroStyles.subtitle}>Únete para continuar</Text>

          <View style={registroStyles.formGroup}>
            <Text style={registroStyles.label}>Nombre</Text>
            <TextInput
              style={registroStyles.input}
              placeholder="Tu nombre"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="words"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={registroStyles.formGroup}>
            <Text style={registroStyles.label}>Contraseña</Text>
            <TextInput
              style={registroStyles.input}
              placeholder="••••••••"
              placeholderTextColor="#9B9B9B"
              secureTextEntry
              value={contraseña}
              onChangeText={setContraseña}
            />
          </View>

          <View style={registroStyles.formGroup}>
            <Text style={registroStyles.label}>Correo</Text>
            <TextInput
              style={registroStyles.input}
              placeholder="usuario@correo.com"
              placeholderTextColor="#9B9B9B"
              keyboardType="email-address"
              autoCapitalize="none"
              value={correo}
              onChangeText={setCorreo}
            />
          </View>

          <View style={registroStyles.formGroup}>
            <Text style={registroStyles.label}>Dirección</Text>
            <TextInput
              style={registroStyles.input}
              placeholder="Ciudad, calle y número"
              placeholderTextColor="#9B9B9B"
              value={direccion}
              onChangeText={setDireccion}
            />
          </View>

          {/* Botón primario negro */}
          <TouchableOpacity
            style={registroStyles.buttonPrimary}
            onPress={() => registroUsuario(nombre, contraseña, correo, direccion)}
          >
            <Text style={registroStyles.buttonTextPrimary}>Registrarse</Text>
          </TouchableOpacity>

          {/* Enlace para volver a Login */}
          <TouchableOpacity
            style={registroStyles.buttonOutline}
            onPress={() => navigation.navigate("Login" as never)}
          >
            <Text style={registroStyles.buttonTextOutline}>
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
