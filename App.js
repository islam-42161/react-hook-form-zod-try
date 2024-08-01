import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  full_name: z.string().min(3, 'Full name must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const FormInput = ({ control, name, ...otherProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...otherProps}
          />
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </>
      )}
    />
  );
};

export default function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      full_name: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    Alert.alert('Successful', JSON.stringify(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Simple Login Form</Text>
      <FormInput
        control={control}
        name="email"
        placeholder="email"
      />
      <FormInput
        control={control}
        name="full_name"
        placeholder="full name"
      />
      <FormInput
        control={control}
        name="password"
        placeholder="password"
        secureTextEntry
      />
      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 8,
  },
});
