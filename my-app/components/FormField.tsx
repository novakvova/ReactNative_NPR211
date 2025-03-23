import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps } from 'react-native'


interface FormFieldProps extends TextInputProps {
    title: string
    value: string
    placeholder: string
    handleChangeText: (text: string) => void
    otherStyles?: string
}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles = '', ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    {...props}
                />


            </View>
        </View>
    )
}

export default FormField
