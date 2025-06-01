/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';

interface Props {
  title: string;
  subTitle?: string;
  rightAction?: () => void;
  rightActionIcon?: string;
  children?: React.ReactNode;
}

export const MainLayout = ({title,subTitle,rightAction,rightActionIcon,children}: Props) => {
  const {top} = useSafeAreaInsets();
  const {canGoBack,goBack} = useNavigation();
//   const canGoBack = navigation.canGoBack?.();

  const renderBackAction = () => {
    if (!canGoBack) {return null;}
    return (
      <TopNavigationAction
        icon={() => <MyIcon name="arrow-back-outline" />}
        onPress={goBack}
      />
    );
  };

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) {return null;}
    return (
      <TopNavigationAction
        icon={() => <MyIcon name={rightActionIcon} />}
        onPress={rightAction}
      />
    );
  };

  return (
    <Layout style={{ paddingTop: top, flex: 1 }}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() =><RenderRightAction/>}
      />
      <Divider />
      <Layout style={{ flex:1 }}>{children}</Layout>
    </Layout>
  );
};
