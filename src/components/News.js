import React from 'react';
import {connect} from 'react-redux';
import {useQuery, useSubscription, useApolloClient} from '@apollo/react-hooks';
import {NEWS} from '../core/graphql/rff/queries/q_news';
import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import {InlineIcon} from '@iconify/react';
import saveIcon from '@iconify/icons-fa-regular/save';
import trashAlt from '@iconify/icons-fa-regular/trash-alt';
import {ADD_NEWS} from '../core/graphql/rff/mutations/m_addNews';
import {REMOVE_NEWS} from '../core/graphql/rff/mutations/m_removeNews';
import {NEWS_ADDED} from '../core/graphql/rff/subscriptions/s_newsAdded';
import {NEWS_UPDATED} from '../core/graphql/rff/subscriptions/s_newsUpdated';
import {NEWS_REMOVED} from '../core/graphql/rff/subscriptions/s_newsRemoved';

import {handleInfo, handleError} from '../core/store/reducers/AppReducer';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme
  };
};
const mapDispatchToProps = {
  handleInfo, handleError
};

const News = (props) => {
  let userToken;
  const client = useApolloClient();
  useSubscription(NEWS_ADDED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const news = subscriptionData.data.newsAdded;
      updateCacheWithNews('added', news);
    }
  });
  useSubscription(NEWS_UPDATED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const news = subscriptionData.data.newsUpdated;
      updateCacheWithNews('updated', news);
    }
  });
  useSubscription(NEWS_REMOVED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const news = subscriptionData.data.newsRemoved;
      updateCacheWithNews('removed', news);
    }
  });

  const {data, error, loading} = useQuery(NEWS);

  const updateCacheWithNews = async (eventType, news) => {
    const includedIn = (set, object) => set.map(n => n.id).includes(object.id);
    const dataInStore = await client.readQuery({
      query: NEWS});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.news, news)) {
        await client.writeQuery({
          query: NEWS,
          data: {news: dataInStore.news.concat(news)}
        });
        props.handleInfo(`News added: ${news.content}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.news, news)) {
        await client.writeQuery({
          query: NEWS,
          data: {
            news: dataInStore.news.map(n => {
              return n.id === news.id ? news : n;
            })}
        });
        props.handleInfo(`News updated: ${news.content}`);
      }
      break;
    case 'removed':
      if(includedIn(dataInStore.news, news)) {
        await client.writeQuery({
          query: NEWS,
          data: {
            news: dataInStore.news.forEach(n => {
              if (n.id !== news.id) return n;
            })}
        });
        props.handleInfo(`News removed: ${news.content}`);
      }
      break;
    default:
      break;
    }
  };

  const handleRemoval = async ({id, content}) => {
    const variables = {
      token: userToken,
      id: id
    };
    await client.mutate({
      mutation: REMOVE_NEWS,
      errorPolicy: 'ignore',
      variables: variables
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        updateCacheWithNews('removed', data.removeNews);
      } else {
        props.handleError(`Error occurred with task: cannot remove ${content}`);
      }
    });
  };
  const handleAddition = async () => {
    const variables = {
      token: userToken,
      content: document.getElementById('addNewsContent').value,
      category: document.getElementById('addNewsCategory').value
    };
    await client.mutate({
      mutation: ADD_NEWS,
      errorPolicy: 'ignore',
      variables: variables
    }).then((result) => {
      const {data} = result;
      if (data !== null) {
        updateCacheWithNews('added', data.addNews);
        document.getElementById('addNewsContent').value = '';
        document.getElementById('addNewsCategory').value = '';
      } else {
        props.handleError(`Error occurred with news: cannot add ${variables.content}`);
      }
    });
  };

  const Error = () => {
    return <>
      <h4 className={classProvider(props.theme, 'description')}>News:</h4>
      <p className={classProvider(props.theme, 'tileError')}>Error occurred</p>
    </>;
  };
  const Loading = () => {
    return <>
      <h4 className={classProvider(props.theme, 'description')}>News:</h4>
      <p className={classProvider(props.theme, 'tileLoading')}>loading . . .</p>
    </>;
  };

  const ManageNews = () => {
    const news = data.news;
    if (props.mode === 'admin') {
      userToken = localStorage.getItem('rffUserToken').substring(7);
      return news.length > 0
        ? <>
          <h4 className={classProvider(props.theme, 'description')}>Manage news:</h4>
          <table className={classProvider(props.theme, 'table')}>
            <thead>
              <tr className={classProvider(props.theme, 'tableRow')}>
                <th className={classProvider(props.theme, 'tableCell')}>content</th>
                <th className={classProvider(props.theme, 'tableCell')}>category</th>
                <th className={classProvider(props.theme, 'tableCell')}>{' '}</th>
              </tr>
            </thead>
            <tbody>
              {news.map(n => {
                return <Manage key={n.id} news={n}/>;
              })}
              <Add/>
            </tbody>
          </table>
        </> : <>
          <h4 className={classProvider(props.theme, 'description')}>Manage news:</h4>
          <p className={classProvider(props.theme, 'news')}>no news</p>
        </>;
    } else {
      return news.length > 0
        ? <>
          <h4 className={classProvider(props.theme, 'description')}>News:</h4>
          <ul>
            {news.map((n) => {
              return <li key={n.id} className={classProvider(props.theme, 'news')}>{n.content}</li>;
            })}</ul>
        </> : <>
          <h4 className={classProvider(props.theme, 'description')}>News:</h4>
          <p className={classProvider(props.theme, 'news')}>no news</p>
        </>;
    }
  };

  const Manage = ({news}) => {
    return (
      <tr className={classProvider(props.theme, 'tableRow')}>
        <td className={classProvider(props.theme, 'tableCell')}>{news.content}</td>
        <td className={classProvider(props.theme, 'tableCell')}>{news.category}</td>
        <td className={classProvider(props.theme, 'tableCell')}>
          <button title='remove news' className={classProvider(props.theme, 'deactivator')}
            onClick={() => handleRemoval(news)}><InlineIcon icon={trashAlt}/></button></td>
      </tr>
    );
  };
  const Add = () => {
    return (
      <tr className={classProvider(props.theme, 'tableRow')}>
        <td className={classProvider(props.theme, 'tableCell')}>
          <input id='addNewsContent' type='text' required minLength={4} placeholder='news content'
            className={classProvider(props.theme, 'formElement')}/>
        </td>
        <td className={classProvider(props.theme, 'tableCell')}>
          <input id='addNewsCategory' type='text' required minLength={3} placeholder='news category'
            className={classProvider(props.theme, 'formElement')}/>
        </td>
        <td className={classProvider(props.theme, 'tableCell')}>
          <button title='save news' className={classProvider(props.theme, 'activator')}
            onClick={() => handleAddition()}><InlineIcon icon={saveIcon}/></button></td>
      </tr>
    );
  };

  return (
    <>
      {error && <Error/>}
      {loading && <Loading/>}
      {data && <ManageNews/>}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(News);