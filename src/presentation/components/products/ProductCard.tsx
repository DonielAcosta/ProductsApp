/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Card } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/product';
import { Image, Text } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props {
    product: Product
}
export const ProductCard = ({product}:Props) => {
   const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <Card style={{ flex: 1, backgroundColor:'#F9F9F9' }}
      onPress={() =>navigation.navigate('ProductScreen',{productId:product.id})}
    >
        {
            (product.images.length === 0) ?
            (<Image source={require('../../../assets/no-product-image.png')} style={{width: '100%',height:200}}/>) :
            (<FadeInImage uri={product.images[0]} style={{flex:1, width: '100%', height:200}}/>)
        }
        <Text numberOfLines={2} style={{ textAlign:'center' }}>{product.title}</Text>
    </Card>
  );
};

