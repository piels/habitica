<template>
  <div>
    <h1 class="mt-4 mb-0"> {{ $t('lookingForPartyTitle') }}</h1>
    <div class="d-flex flex-wrap">
      <div
        v-for="(seeker, index) in seekers"
        :key="seeker._id"
        class="seeker"
      >
        <div class="d-flex">
          <avatar
            :member="seeker"
            :hideClassBadge="true"
            @click.native="showMemberModal(seeker._id)"
            class="mr-3 mb-2"
          />
          <div class="card-data">
            <user-link
              :user-id="seeker._id"
              :name="seeker.profile.name"
              :backer="seeker.backer"
              :contributor="seeker.contributor"
            />
            <div class="small-with-border pb-2 mb-2">
              @{{ seeker.auth.local.username }} • {{ $t('level') }} {{ seeker.stats.lvl }}
            </div>
            <div
              class="d-flex"
            >
              <strong> {{ $t('classLabel') }} </strong>
              <span
                class="svg-icon d-inline-block icon-16 my-auto mx-2"
                v-html="icons[seeker.stats.class]"
              >
              </span>
              <strong
                :class="`${seeker.stats.class}-color`"
              >
                {{ $t(seeker.stats.class) }}
              </strong>
            </div>
            <div>
              <strong class="mr-2"> {{ $t('checkinsLabel') }} </strong> {{ seeker.loginIncentives }}
            </div>
            <div>
              <strong class="mr-2"> {{ $t('languageLabel') }} </strong>
              {{ displayLanguage(seeker.preferences.language) }}
            </div>
          </div>
        </div>
        <strong
          v-if="!seeker.invited"
          @click="inviteUser(seeker._id, index)"
          class="btn btn-primary w-100"
        >
          {{ $t('inviteToParty') }}
        </strong>
        <div
          v-else
          @click="rescindInvite(seeker._id, index)"
          class="btn btn-success w-100"
          v-html="$t('invitedToYourParty')"
        >
        </div>
      </div>
      <mugen-scroll
        v-show="loading"
        :handler="infiniteScrollTrigger"
        :should-handle="!loading && canLoadMore"
        :threshold="1"
      >
        <h2
          v-once
          class="col-12 loading"
        >
          {{ $t('loading') }}
        </h2>
      </mugen-scroll>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~@/assets/scss/colors.scss';

  h1 {
    color: $purple-300;
  }

  strong {
    line-height: 1.71;
  }
  .avatar {
    background-color: $gray-600;
  }

  .btn-success {
    box-shadow: none;
    color: $green-1;
    font-weight: normal;

    &:active {
      color: $green-1;
    }
  }

  .card-data {
    width: 267px;
  }

  .loading {
    text-align: center;
    color: $purple-300;
  }

  .seeker {
    width: 448px;
    margin: 24px 24px 24px 0;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(26, 24, 29, 0.12), 0 1px 2px 0 rgba(26, 24, 29, 0.24);
  }
  .small-with-border {
    border-bottom: 1px solid $gray-500;
    color: $gray-100;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.33;
  }

  .healer-color {
    color: $yellow-10;
  }

  .rogue-color {
    color: $purple-200;
  }

  .warrior-color {
    color: $red-50;
  }

  .wizard-color {
    color: $blue-10;
  }
</style>

<script>
import debounce from 'lodash/debounce';
import MugenScroll from 'vue-mugen-scroll';
import Avatar from '../avatar';
import userLink from '../userLink';
import { mapState } from '@/libs/store';

import warriorIcon from '@/assets/svg/warrior.svg';
import rogueIcon from '@/assets/svg/rogue.svg';
import healerIcon from '@/assets/svg/healer.svg';
import wizardIcon from '@/assets/svg/wizard.svg';

export default {
  components: {
    Avatar,
    MugenScroll,
    userLink,
  },
  data () {
    return {
      canLoadMore: true,
      loading: true,
      page: 0,
      party: {},
      seekers: [],
      icons: Object.freeze({
        warrior: warriorIcon,
        rogue: rogueIcon,
        healer: healerIcon,
        wizard: wizardIcon,
      }),
    };
  },
  computed: {
    ...mapState({
      availableLanguages: 'i18n.availableLanguages',
      user: 'user.data',
    }),
  },
  async mounted () {
    try {
      this.party = await this.$store.dispatch('guilds:getGroup', { groupId: this.user.party._id });
    } catch {
      this.$router.push('/');
    }
    if (!this.party._id || this.party.leader._id !== this.user._id) {
      this.$router.push('/');
    } else {
      this.$store.dispatch('common:setTitle', {
        section: 'Party Seekers',
      });
      this.seekers = await this.$store.dispatch('guilds:getPartySeekers');
      this.canLoadMore = this.seekers.length === 30;
      this.loading = false;
    }
  },
  methods: {
    displayLanguage (languageCode) {
      const language = this.availableLanguages.find(lang => lang.code === languageCode);
      if (language) {
        return language.name;
      }
      return languageCode;
    },
    infiniteScrollTrigger () {
      if (this.canLoadMore) {
        this.loading = true;
      }

      this.loadMore();
    },
    async inviteUser (userId, index) {
      await this.$store.dispatch('guilds:invite', {
        invitationDetails: {
          inviter: this.user.profile.name,
          uuids: [userId],
        },
        groupId: this.party._id,
      });
      this.seekers[index].invited = true;
    },
    loadMore: debounce(async function loadMoreDebounce () {
      this.page += 1;
      const addlSeekers = await this.$store.dispatch('guilds:getPartySeekers', { page: this.page });
      this.seekers = this.seekers.concat(addlSeekers);
      this.canLoadMore = this.seekers.length % 30 === 0;
      this.loading = false;
    }, 1000),
    async rescindInvite (userId, index) {
      await this.$store.dispatch('members:removeMember', {
        memberId: userId,
        groupId: this.party._id,
      });
      this.seekers[index].invited = false;
    },
    showMemberModal (userId) {
      this.$router.push({ name: 'userProfile', params: { userId } });
    },
  },
};
</script>
