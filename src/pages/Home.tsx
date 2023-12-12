import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem, IonItemOption, IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './Home.css';
import React, { useCallback, useEffect, useState } from 'react';

const Home: React.FC = () => {

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=100'); // Replace with your API endpoint
        if (response.ok) {
          const jsonData = await response.json();
          setUsers(jsonData.results);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, [])

  const onDelete = useCallback((indexToRemove: number) => {
    const updatedUsers = users.filter((_, index) => index !== indexToRemove);
    setUsers(updatedUsers);
    closeSlidingItems();
  }, [users])

  const closeSlidingItems = () => {
    const list = document.querySelector('ion-list');
    if (list) list.closeSlidingItems();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mini Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {users.map((item, index) => (
            <IonItemSliding key={index}>
              <IonItem>
                <IonAvatar slot='start'>
                  <img src={item.picture.thumbnail} alt='' />
                </IonAvatar>
                <IonLabel>{`${item.name.first} ${item.name.last}`}</IonLabel>
              </IonItem>

              <IonItemOptions>
                <IonItemOption color='danger' onClick={() => onDelete(index)}>Delete</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
