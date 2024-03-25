import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Title } from 'react-native-paper'

import styles from'./styles'
export default function CategoryOutline({title,onPress}) {

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView horizontal={true}>
              {
                  title.map((title,i)=>{
                      return (
                        <View key={i}>
                          <TouchableOpacity onPress={() => onPress(title)}>
                            <Card style={styles.card}>
                              <Card.Content>
                                <Title style={styles.title}>
                                  {title.category}
                                </Title>
                              </Card.Content>
                            </Card>
                          </TouchableOpacity>
                        </View>
                      );
                  })
              }
            
          </ScrollView>
        </View>
      </View>
    );
}
