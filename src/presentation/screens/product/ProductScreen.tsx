/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Button, ButtonGroup, Input, Layout, useTheme } from '@ui-kitten/components';
import { MainLayout } from '../../layouts/MainLayout';
import { useMutation, useQuery } from '@tanstack/react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { getProductById } from '../../../actions/auth/products/get-product-by-id';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Product, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';
import { Formik } from 'formik';
import { updateCreateProduct } from '../../../actions/auth/products/update-create-product';

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
  const mutation = useMutation({
    mutationFn: (data:Product) => updateCreateProduct({...data, id:productIdRef.current}),
    onSuccess(data:Product) {
        // console.log('Success');
        console.log({data});

    },
  });
  if(!product){
    return(<MainLayout title="Cargando.."/>);
  }
  return (
    <Formik
    initialValues={product}
    onSubmit={mutation.mutate}
    >
      {
        ({handleChange,handleSubmit,values,errors,setFieldValue}) =>(
        <MainLayout
        title={values.title}
        subTitle={`Precio: ${values.price}`}
        >
          <ScrollView style={{ flex:1 }}>
            {/* imagenes de productos */}
            <Layout>
              <FlatList
              data={values.images}
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
              value ={values.title}
              onChangeText={handleChange('title')}
              style={{ marginVertical:5 }}
              />
              <Input
                label="Slug"
                value ={values.slug}
                onChangeText={handleChange('slug')}
                style={{ marginVertical:5 }}
              />
              <Input
                label="Descripcion"
                value ={values.description}
                onChangeText={handleChange('description')}
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
                  value ={values.price.toString()}
                  onChangeText={handleChange('price')}
                  style={{flex: 1}}
                  keyboardType="numeric"
                />
                <Input
                  label="Inventario"
                  value ={values.stock.toString()}
                  onChangeText={handleChange('stock')}
                  style={{  flex: 1}}
                  keyboardType="numeric"
                />
            </Layout>
            {/* Selectores de Talla */}
            <ButtonGroup
              style={{margin: 2, marginTop: 20, marginHorizontal: 15}}
              size="small"
              appearance="outline">
              {sizes.map(size => (
                <Button
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  key={size}
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}>
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup
              style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
              size="small"
              appearance="outline">
              {genders.map((gender) => (
                <Button
                onPress={() => setFieldValue('gender',gender)}
                key={gender}
                style={{
                  flex:1,
                  backgroundColor: values.gender.startsWith(gender)
                  ? theme['color-primary-200']
                  : undefined,

                }}>{gender}</Button>
              ))}
            </ButtonGroup>
            {/* Boton guardar */}
            <Button
            accessoryLeft={<MyIcon name="save-outline" white/>}
            onPress={() => handleSubmit()}
            disabled={mutation.isPending}
            style={{ margin: 15 }}
            >Guardar</Button>
            <Layout style={{height: 220 }}/>
          </ScrollView>
        </MainLayout>
        )
      }
    </Formik>
  );
};
