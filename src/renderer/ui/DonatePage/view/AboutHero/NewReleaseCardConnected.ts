import { connect, MapStateToProps } from 'react-redux';

import selectors from '#selectors';

import { IRootState } from '~renderer/state/rootState';
import { IGithubReleaseAsset } from '~renderer/types/api';
import { NewReleaseCard } from '~renderer/ui/DonatePage/view/NewReleaseCard';

interface IStateProps {
  newReleaseName: string;
  newReleaseAssets: IGithubReleaseAsset[];
}

const mapStateToProps: MapStateToProps<IStateProps, {}, IRootState> = (
  state: IRootState
): IStateProps => {
  const { name, assets } = selectors.getNewRelease(state);

  return {
    newReleaseName: name,
    newReleaseAssets: assets
  };
};

export const NewReleaseCardConnected: React.ComponentClass = (
  connect<IStateProps>(mapStateToProps)(NewReleaseCard)
);
