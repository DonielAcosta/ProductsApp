/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Layout, Spinner } from '@ui-kitten/components';

export const FullScreenLoader = () => {
  return (
    <Layout style={{ flex: 1, justifyContent:'center',alignItems:'center' }}>
        <Spinner size="giant"/>
    </Layout>
  );
};
