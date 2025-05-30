/* eslint-disable react/react-in-jsx-scope */
import { getProductsByPage } from '../../../actions/auth/products/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { Text } from '@ui-kitten/components';

export const HomeScreen = () => {


  const {isLoading, data:products =[]} = useQuery({
    queryKey:['products','infinite'],
    staleTime: 100 * 60 * 60,
    queryFn : ()=> getProductsByPage(0),
  });

  // getProductsByPage(0);
  return (
    <MainLayout
    title="TesloShop - Products"
    subTitle="Aplicacion administrativa"
    // rightAction={() => {}}
    // rightActionIcon="plus-outline"
    >
      <Text>Matando la liga</Text>

    </MainLayout>
  );
};
