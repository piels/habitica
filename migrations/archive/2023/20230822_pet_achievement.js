/* eslint-disable no-console */
const MIGRATION_NAME = '20230522_pet_group_achievements';
import { model as User } from '../../../website/server/models/user';

const progressCount = 1000;
let count = 0;

async function updateUser (user) {
  count++;

  const set = {
    migration: MIGRATION_NAME,
  };

  if (user && user.items && user.items.pets) {
    const pets = user.items.pets;
    if (pets['Beetle-Base']
      && pets['Beetle-CottonCandyBlue']
      && pets['Beetle-CottonCandyPink']
      && pets['Beetle-Desert']
      && pets['Beetle-Golden']
      && pets['Beetle-Red']
      && pets['Beetle-Shade']
      && pets['Beetle-Skeleton']
      && pets['Beetle-White']
      && pets['Beetle-Zombie']
      && pets['Butterfly-Base']
      && pets['Butterfly-CottonCandyBlue']
      && pets['Butterfly-CottonCandyPink']
      && pets['Butterfly-Desert']
      && pets['Butterfly-Golden']
      && pets['Butterfly-Red']
      && pets['Butterfly-Shade']
      && pets['Butterfly-Skeleton']
      && pets['Butterfly-White']
      && pets['Butterfly-Zombie']
      && pets['Cuttlefish-Base']
      && pets['Cuttlefish-CottonCandyBlue']
      && pets['Cuttlefish-CottonCandyPink']
      && pets['Cuttlefish-Desert']
      && pets['Cuttlefish-Golden']
      && pets['Cuttlefish-Red']
      && pets['Cuttlefish-Shade']
      && pets['Cuttlefish-Skeleton']
      && pets['Cuttlefish-White']
      && pets['Cuttlefish-Zombie']
      && pets['NudibranchTRex-Base']
      && pets['Nudibranch-CottonCandyBlue']
      && pets['Nudibranch-CottonCandyPink']
      && pets['Nudibranch-Desert']
      && pets['Nudibranch-Golden']
      && pets['Nudibranch-Red']
      && pets['Nudibranch-Shade']
      && pets['Nudibranch-Skeleton']
      && pets['Nudibranch-White']
      && pets['Nudibranch-Zombie']
      && pets['Octopus-Base']
      && pets['Octopus-CottonCandyBlue']
      && pets['Octopus-CottonCandyPink']
      && pets['Octopus-Desert']
      && pets['Octopus-Golden']
      && pets['Octopus-Red']
      && pets['Octopus-Shade']
      && pets['Octopus-Skeleton']
      && pets['Octopus-White']
      && pets['Octopus-Zombie']
      && pets['Snail-Base']
      && pets['Snail-CottonCandyBlue']
      && pets['Snail-CottonCandyPink']
      && pets['Snail-Desert']
      && pets['Snail-Golden']
      && pets['Snail-Red']
      && pets['Snail-Shade']
      && pets['Snail-Skeleton']
      && pets['Snail-White']
      && pets['Snail-Zombie']
      && pets['Spider-Base']
      && pets['Spider-CottonCandyBlue']
      && pets['Spider-CottonCandyPink']
      && pets['Spider-Desert']
      && pets['Spider-Golden']
      && pets['Spider-Red']
      && pets['Spider-Shade']
      && pets['Spider-Skeleton']
      && pets['Spider-White']
      && pets['Spider-Zombie']) {
        set['achievements.bonelessBoss'] = true;
      }
  }

  if (count % progressCount === 0) console.warn(`${count} ${user._id}`);

  return await User.update({ _id: user._id }, { $set: set }).exec();
}

export default async function processUsers () {
  let query = {
    // migration: { $ne: MIGRATION_NAME },
    'auth.timestamps.loggedin': { $gt: new Date('2023-07-15') },
  };

  const fields = {
    _id: 1,
    items: 1,
  };

  while (true) { // eslint-disable-line no-constant-condition
    const users = await User // eslint-disable-line no-await-in-loop
      .find(query)
      .limit(250)
      .sort({_id: 1})
      .select(fields)
      .lean()
      .exec();

    if (users.length === 0) {
      console.warn('All appropriate users found and modified.');
      console.warn(`\n${count} users processed\n`);
      break;
    } else {
      query._id = {
        $gt: users[users.length - 1]._id,
      };
    }

    await Promise.all(users.map(updateUser)); // eslint-disable-line no-await-in-loop
  }
};
