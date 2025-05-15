/* eslint-disable react/react-in-jsx-scope */
import { Button, Icon, Layout, Text } from '@ui-kitten/components';

export const HomeScreen = () => {
  return (
    <Layout>
        <Text>HomeScreen</Text>
        {/* <Icon name="facebook"/> */}
        <Button accessoryLeft={<Icon name="facebook"/> }>Login with Facebook</Button>
    </Layout>
  );
};
