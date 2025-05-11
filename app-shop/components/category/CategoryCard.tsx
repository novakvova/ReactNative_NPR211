import React from 'react'
import { View, Image, Text } from 'react-native'
import { BASE_URL } from '@/constants/Urls'
import {ICategoryItem} from "@/interfaces/category";

interface CategoryCardProps {
  category: ICategoryItem
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {

  console.log(`${BASE_URL}/uploading/200_${category.image}`);
  return (
    <View
      className={`flex flex-1 bg-white rounded-md p-2 items-center shadow-sm shadow-white relative`}>
      <Image source={{ uri: `${BASE_URL}/uploading/200_${category.image}` }} className="w-24 h-24 rounded-full mb-2" />
      <Text className="text-lg font-semibold mb-1">{category.name}</Text>
    </View>
  )
}

export default CategoryCard
