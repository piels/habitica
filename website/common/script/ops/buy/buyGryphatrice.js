import moment from 'moment';
import i18n from '../../i18n';
import {
  NotAuthorized,
} from '../../libs/errors';
import updateUserBalance from '../updateUserBalance';
import { EVENTS } from '../../content/constants/events';

export default async function purchaseGryphatrice (user, req = {}, analytics, inGems) {
  const key = 'Jubilant-Gryphatrice';

  if (user.items.pets[key]) {
    throw new NotAuthorized(i18n.t('petsAlreadyOwned', req.language));
  }
  if (!moment().isBetween(EVENTS.birthday10.start, EVENTS.birthday10.end)) return false;

  if (inGems) {
    await updateUserBalance(user, 15, 'spend', key, i18n.t(key));
  }

  user.items.pets = {
    ...user.items.pets,
    [key]: 5,
  };
  if (user.markModified) user.markModified('items.pets');

  return [
    { items: user.items },
    i18n('messageBought', {
      itemText: i18n.t(key),
    }),
  ];
}
