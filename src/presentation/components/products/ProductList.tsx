/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { Layout, List } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/product';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList = ({ products,fetchNextPage }: Props) => {

  const queryClient = useQueryClient();
  const [isRefreshing, setRefreshing] = useState(false);

  const onPullToRefresh = async() => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve,1500));
    queryClient.invalidateQueries({queryKey:['products', 'infinite']});


    setRefreshing(false);
  };
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => ( <ProductCard product={item}/> )}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8} //para que este al final

      refreshControl={
        <RefreshControl
          refreshing={ isRefreshing}
          onRefresh={onPullToRefresh}
         />
      }
    />
  );
};
