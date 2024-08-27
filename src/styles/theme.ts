import { StyleSheet } from 'react-native';

export const colors = {
  light: {
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#333333',
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#FF2D55',
    border: '#E5E5EA',
    success: '#4CD964',
    error: '#FF3B30',
  },
  dark: {
    background: '#1C1C1E',
    card: '#2C2C2E',
    text: '#FFFFFF',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    accent: '#FF375F',
    border: '#38383A',
    success: '#32D74B',
    error: '#FF453A',
  },
};

export const createThemedStyles = (theme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    padding: 20,
  },
  card: {
    backgroundColor: colors[theme].card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors[theme].text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors[theme].text,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors[theme].text,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors[theme].primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors[theme].border,
    color: colors[theme].text,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  // Add more styles as needed
});

export const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};