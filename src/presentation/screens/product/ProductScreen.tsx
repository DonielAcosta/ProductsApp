/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Button, ButtonGroup, Input, Layout, useTheme } from '@ui-kitten/components';
import { MainLayout } from '../../layouts/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { getProductById } from '../../../actions/auth/products/get-product-by-id';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';

const sizes: Size[] = [
  Size.Xs,
  Size.S,
  Size.M,
  Size.L,
  Size.Xl,
  Size.Xxl,
];
const genders: Gender[] = [Gender.Kid,Gender.Men,Gender.Unisex,Gender.Women];
interface Props extends StackScreenProps<RootStackParams,'ProductScreen'>{}
export const ProductScreen = ({route}:Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();


  //useQuery
  const {data: product} = useQuery({
    queryKey:['product',productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });
  //useMutation
  if(!product){
    return(<MainLayout title="Cargando.."/>);
  }
  return (
    <MainLayout
    title="Product"
    subTitle={`Precio: ${product.price}`}
    >
      <ScrollView style={{ flex:1 }}>
        {/* imagenes de productos */}
        <Layout>
          <FlatList
          data={product.images}
          keyExtractor={(item) => item}
          horizontal
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>(
            <FadeInImage
              uri= {item}
              style={{ width:300, height:300, marginHorizontal:7 }}
            />
          )}
          />
        </Layout>
        {/* formulario */}
        <Layout style={{ marginHorizontal:10 }}>
          <Input
          label="Titulo"
          value={product.title}
          style={{ marginVertical:5 }}
          />
          <Input
            label="Slug"
            value={product.slug}
            style={{ marginVertical:5 }}
          />
          <Input
            label="Descripcion"
            value={product.description}
            multiline
            numberOfLines={5}
            style={{ marginVertical:5 }}
          />
        </Layout>
        {/* precio he inventario */}
        <Layout
           style={{ marginHorizontal:15, marginVertical:5, flexDirection: 'row',gap:10 }}

           >
          <Input
              label="Precio"
              value={product.price.toString()}
              style={{flex: 1}}
            />
            <Input
              label="Inventario"
              value={product.stock.toString()}
              style={{  flex: 1}}
            />
        </Layout>
        {/* Selectores de Talla */}
        <ButtonGroup
          style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
          size="small"
          appearance="outline">
          {sizes.map((size) => (
            <Button key={size} style={{
              flex:1,
              backgroundColor: true
              ? theme['color-primary-200']
              : undefined,

            }}>{size}</Button>
          ))}
        </ButtonGroup>
        <ButtonGroup
          style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
          size="small"
          appearance="outline">
          {genders.map((gender) => (
            <Button key={gender} style={{
              flex:1,
              backgroundColor: true
              ? theme['color-primary-200']
              : undefined,

            }}>{gender}</Button>
          ))}
        </ButtonGroup>
        {/* Boton guardar */}
        <Button
        accessoryLeft={<MyIcon name="save-outline" white/>}
        onPress={() => console.log('guardar')}
        style={{ margin: 15 }}
        >Guardar</Button>
        <Layout style={{height: 220 }}/>
      </ScrollView>
    </MainLayout>
  );
};
