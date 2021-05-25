import React, {useEffect, useState} from 'react';
import {action} from '@storybook/addon-actions';

import {
  LANGUAGE_NAMES,
  getPhrasesForCategoryId,
  getAllCategories,
} from '../data/dataUtils';

import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import List from '../components/List/List';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import ToolBar from '../components/ToolBar/ToolBar';
import ToolButton from '../components/ToolButton/ToolButton';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import AddIcon from '../components/ToolButton/assets/add.svg';
import CheckIcon from '../components/ToolButton/assets/check.svg';
import CheckAllIcon from '../components/ToolButton/assets/check-all.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import {LEARNT_PRHASES_ID, SEEN_PHRASES_ID} from '../redux/constants/index';

export default ({
  navigation,
  categories,
  nativeLanguage,
  //actions
  setCurrentCategory,
  seenPhrases,
  setPhrases,
  learntPhrases,
  getAllCategories,
  userPhrases,
  setCategories,
  synchronizeStorageToRedux,
  // getAllCategoriesAction,
}) => {
  useEffect(() => {
    synchronizeStorageToRedux();
    getAllCategories();
  }, []);

  const openCategoryPhrases = item => {
    setCurrentCategory(item.id);
    // fetch Phrases for category
    const phrasesForCategory = getPhrasesForCategoryId(item.id);
    const filterUserPhrases = userPhrases.filter(
      userPhrase => userPhrase.catId === item.id,
    );

    const combinationNewCatAndCurrentCat = [
      ...phrasesForCategory,
      ...filterUserPhrases,
    ];
    setPhrases(combinationNewCatAndCurrentCat);
    navigation.navigate('Learn');
  };

  const openCategoryLearntPhrases = item => {
    setCurrentCategory(item.id);
    // fetch Phrases for categor
    setPhrases(learntPhrases);
    learntPhrases.length !== 0 && navigation.navigate('Learn');
  };

  const openSeenPhrases = async item => {
    setCurrentCategory(item.id);
    setPhrases(seenPhrases);
    seenPhrases.length !== 0 && navigation.navigate('Learn');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={{paddingHorizontal: 35, paddingVertical: 23}}>
          <View style={styles.header}>
            <ToolBar
              button={
                <ToolButton
                  onPress={() => {
                    navigation.navigate('NewTerm');
                  }}>
                  <AddIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <LanguageSwitcher
                  firstLanguage={LANGUAGE_NAMES.EN}
                  LeftText="EN"
                  RightText="MA"
                  color="#FFFFFF"
                  iconType=""
                  iconName="swap-horiz"
                  onPress={() => null}
                  iconSize={24}
                />
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={action('clicked-add-button')}>
                  <CheckIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={openCategoryLearntPhrases}>
                  <CheckAllIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={action('clicked-add-button')}>
                  <ModeIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
          </View>
          <View style={styles.heading}>
            <SectionHeading text="Select a category:" />
          </View>
          <List
            lang={nativeLanguage}
            data={categories}
            text={'Learn'}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryPhrases}
          />
          <View style={styles.heading}>
            <SectionHeading text="Seen phrases:" />
          </View>
          <List
            data={[
              {
                id: `${SEEN_PHRASES_ID}`,
                name: `${
                  seenPhrases.length === 0 ? 'No' : `${seenPhrases.length}`
                } words and phrases`,
              },
            ]}
            text={'Learn'}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openSeenPhrases}
          />
          <View style={styles.heading}>
            <SectionHeading text="Learnt phrases:" />
          </View>
          <List
            data={[
              {
                id: LEARNT_PRHASES_ID,
                name: `${
                  learntPhrases?.length ? learntPhrases?.length : 'No'
                } words and phrases`,
              },
            ]}
            text={'Learn'}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryLearntPhrases}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingBottom: 56,
  },
  heading: {
    paddingBottom: 15,
  },
});
