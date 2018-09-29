import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import actions from '~renderer/state/actions';
import { IRootState } from '~renderer/state/rootState';
import selectors from '~renderer/state/selectors';
import { FeedScreen } from '~renderer/ui/DiscoverPage/view/FeedScreen';
import i18n from '~shared/data/i18n';

interface IStateProps {
  albumsIds: number[];
  hasRefreshButton: boolean;
  title: string;
}

const mapStateToProps: MapStateToProps<IStateProps, {}, IRootState> = (
  state: IRootState
): IStateProps => {
  const searchValue: string = selectors.getDiscoverSearchValue(state);
  let title: string;
  if (searchValue) {
    title = `${i18n.SEARCH_RESULTS_FOR} "${searchValue}"`;
  } else {
    title = i18n.LATEST_ALBUMS;
  }

  return {
    albumsIds: selectors.getDiscoverAlbumsIds(state),
    hasRefreshButton: !searchValue && selectors.isDiscoverAlbumsOutdated(state),
    title
  };
};

interface IDispatchProps {
  onRefreshButtonClick(): void;
}

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = {
  onRefreshButtonClick: actions.systemDiscoverAlbumsFetch
};

export const FeedScreenConnected: React.ComponentClass<{}> = (
  connect<IStateProps, IDispatchProps, {}, IRootState>(mapStateToProps, mapDispatchToProps)(FeedScreen)
);
