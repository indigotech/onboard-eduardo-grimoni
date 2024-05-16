import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';

interface User {
  id: number;
  nome: string;
  email: string;
}

const fakeUsers = [
  {id: 1, nome: 'João Silva', email: 'joao.silva@example.com'},
  {id: 2, nome: 'Maria Oliveira', email: 'maria.oliveira@example.com'},
  {id: 3, nome: 'José Santos', email: 'jose.santos@example.com'},
  {id: 4, nome: 'Ana Costa', email: 'ana.costa@example.com'},
  {id: 5, nome: 'Luiz Pereira', email: 'luiz.pereira@example.com'},
  {id: 6, nome: 'Carla Souza', email: 'carla.souza@example.com'},
  {id: 7, nome: 'Antônio Lima', email: 'antonio.lima@example.com'},
  {id: 8, nome: 'Paula Almeida', email: 'paula.almeida@example.com'},
  {id: 9, nome: 'Fernando Castro', email: 'fernando.castro@example.com'},
  {id: 10, nome: 'Aline Santos', email: 'aline.santos@example.com'},
];

const Userlist = () => {
  const renderItem = ({item}: {item: User}) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.nome}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <FlatList
        data={fakeUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Userlist;
