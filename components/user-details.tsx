import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_DETAILS} from './queries';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {styles} from './styles';

export function UserDetails(props: {userId: any}) {
  const {userId} = props;
  console.log(userId);
  const {loading, error, data} = useQuery(GET_DETAILS, {
    variables: {
      userId: userId,
    },
  });
  if (loading) {
    return <ActivityIndicator style={localStyles.loadingIndicator} />;
  }
  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  const user = data.user;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <View style={localStyles.userDetailsContainer}>
        <Text style={localStyles.detailLabel}>ID:</Text>
        <Text style={localStyles.detailValue}>{user.id}</Text>
      </View>
      <View style={localStyles.userDetailsContainer}>
        <Text style={localStyles.detailLabel}>Name:</Text>
        <Text style={localStyles.detailValue}>{user.name}</Text>
      </View>
      <View style={localStyles.userDetailsContainer}>
        <Text style={localStyles.detailLabel}>Phone:</Text>
        <Text style={localStyles.detailValue}>{user.phone}</Text>
      </View>
      <View style={localStyles.userDetailsContainer}>
        <Text style={localStyles.detailLabel}>Birth Date:</Text>
        <Text style={localStyles.detailValue}>{user.birthDate}</Text>
      </View>
      <View style={localStyles.userDetailsContainer}>
        <Text style={localStyles.detailLabel}>Email:</Text>
        <Text style={localStyles.detailValue}>{user.email}</Text>
      </View>
      <View style={localStyles.userDetailsContainer}>
        <Text style={localStyles.detailLabel}>Role:</Text>
        <Text style={localStyles.detailValue}>{user.role}</Text>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  userDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailValue: {
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
    color: '#0000ff',
  },
});
