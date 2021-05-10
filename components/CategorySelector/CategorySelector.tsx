import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDictionary } from '../../services/dictionary-hook';
import ApplicationLayout from '../ApplicationLayout/ApplicationLayout';

interface Props {
    data?: string;
}

const CategorySelector: React.FC<Props> = (props: Props) => {
    const { dictionary, selectCategory } = useDictionary();
    const navigation = useNavigation();

    function pressHandler(uuid: string) {
        selectCategory(uuid);
        navigation.goBack();
    }

    return (
        <ApplicationLayout title="Categories" backButton={true}>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {dictionary.categories.map((category) => (
                        <TouchableOpacity key={category.uuid}
                            onPress={() => pressHandler(category.uuid)}>
                            <Text style={styles.category}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ApplicationLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        padding: 20,
    },
    category: {
        textAlign: 'center',
        fontFamily: 'IndieFlower-Regular',
        fontSize: 24,
        letterSpacing: 10,
        backgroundColor: 'black',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
});

export default CategorySelector;

