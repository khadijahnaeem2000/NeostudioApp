import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSurveyList,
  getSurveyListQuestions,
} from '../../Redux/action';
import { styles } from './styles';
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component';
import { images } from '../../constant';

const Survey = () => {
  const dispatch = useDispatch()

  const { login, surveyItems, AuthLoading } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getSurveyList(login?.data?.type, login?.data?.id))
  }, [])

  return (
    <Container title={"Encuestas"} >
      <FlatList
        ListFooterComponent={<SizedBox />}
        data={surveyItems}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SingleFolderView
            key={'unique' + index}
            image={images.complete_exam}
            title={item?.name}
            isActive={item?.isActive}
            status="Habilitado"
            onPress={() => (
              dispatch(getSurveyListQuestions(
                item.id,
                true,
                login?.data?.id,
              ))
            )}
          />
        )}
      />

      <LoaderModal visible={AuthLoading} />
    </Container>
  );
}

export default Survey