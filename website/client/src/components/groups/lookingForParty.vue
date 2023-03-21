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
              @click.native="showMemberModal(seeker._id)"
              class="mr-3 mb-2"
          />
          <div class="card-data">
            <div>
              <strong>{{ seeker.profile.name }}</strong>
            </div>
            <div class="small-with-border pb-2 mb-2">
              @{{ seeker.auth.local.username }} • {{ $t('level') }} {{ seeker.stats.lvl }}
            </div>
            <div>
              <strong> {{ $t('classLabel') }} </strong> {{ seeker.stats.class }}
            </div>
            <div>
              <strong> {{ $t('checkinsLabel') }} </strong> {{ seeker.loginIncentives }}
            </div>
            <div>
              <strong> {{ $t('languageLabel') }} </strong> {{ seeker.preferences.language }}
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
        <strong
          v-else
          @click="rescindInvite(seeker._id, index)"
          class="btn btn-success w-100"
        >
          {{ $t('invitedToYourParty') }}
        </strong>
      </div>
    </div>
    <strong
      v-if="seekers.length % 30 === 0"
      @click="loadMore()"
    >
      Load More
    </strong>
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

  .btn-success {
    box-shadow: none;
    color: $green-1;
  }
  .card-data {
    width: 267px;
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
</style>

<script>
import { mapState } from '@/libs/store';
import Avatar from '../avatar';

export default {
  components: {
    Avatar,
  },
  data () {
    return {
      page: 0,
      party: {},
      seekers: [],
    };
  },
  computed: {
    ...mapState({
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
    }
  },
  methods: {
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
    async loadMore () {
      this.page += 1;
      const addlSeekers = await this.$store.dispatch('guilds:getPartySeekers', { page: this.page });
      this.seekers = this.seekers.concat(addlSeekers);
    },
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
